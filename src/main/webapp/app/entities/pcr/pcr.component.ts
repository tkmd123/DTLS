import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPCR } from 'app/shared/model/pcr.model';
import { Principal } from 'app/core';
import { PCRService } from './pcr.service';

@Component({
    selector: 'jhi-pcr',
    templateUrl: './pcr.component.html'
})
export class PCRComponent implements OnInit, OnDestroy {
    pCRS: IPCR[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private pCRService: PCRService,
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
            this.pCRService
                .search({
                    query: this.currentSearch
                })
                .subscribe((res: HttpResponse<IPCR[]>) => (this.pCRS = res.body), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.pCRService.query().subscribe(
            (res: HttpResponse<IPCR[]>) => {
                this.pCRS = res.body;
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
        this.registerChangeInPCRS();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPCR) {
        return item.id;
    }

    registerChangeInPCRS() {
        this.eventSubscriber = this.eventManager.subscribe('pCRListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
