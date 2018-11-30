import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPCRMoi } from 'app/shared/model/pcr-moi.model';
import { Principal } from 'app/core';
import { PCRMoiService } from './pcr-moi.service';

@Component({
    selector: 'jhi-pcr-moi',
    templateUrl: './pcr-moi.component.html'
})
export class PCRMoiComponent implements OnInit, OnDestroy {
    pCRMois: IPCRMoi[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private pCRMoiService: PCRMoiService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.pCRMoiService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IPCRMoi[]>) => (this.pCRMois = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.pCRMoiService.query().subscribe(
            (res: HttpResponse<IPCRMoi[]>) => {
                this.pCRMois = res.body;
                this.currentSearch = '';
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPCRMois();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPCRMoi) {
        return item.id;
    }

    registerChangeInPCRMois() {
        this.eventSubscriber = this.eventManager.subscribe('pCRMoiListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
