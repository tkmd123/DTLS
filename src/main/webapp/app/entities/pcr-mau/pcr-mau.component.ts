import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPCRMau } from 'app/shared/model/pcr-mau.model';
import { Principal } from 'app/core';
import { PCRMauService } from './pcr-mau.service';

@Component({
    selector: 'jhi-pcr-mau',
    templateUrl: './pcr-mau.component.html'
})
export class PCRMauComponent implements OnInit, OnDestroy {
    pCRMaus: IPCRMau[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private pCRMauService: PCRMauService,
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
            this.pCRMauService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IPCRMau[]>) => (this.pCRMaus = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.pCRMauService.query().subscribe(
            (res: HttpResponse<IPCRMau[]>) => {
                this.pCRMaus = res.body;
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
        this.registerChangeInPCRMaus();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPCRMau) {
        return item.id;
    }

    registerChangeInPCRMaus() {
        this.eventSubscriber = this.eventManager.subscribe('pCRMauListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
