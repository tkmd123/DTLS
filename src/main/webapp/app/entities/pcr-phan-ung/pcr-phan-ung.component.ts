import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPCRPhanUng } from 'app/shared/model/pcr-phan-ung.model';
import { Principal } from 'app/core';
import { PCRPhanUngService } from './pcr-phan-ung.service';

@Component({
    selector: 'jhi-pcr-phan-ung',
    templateUrl: './pcr-phan-ung.component.html'
})
export class PCRPhanUngComponent implements OnInit, OnDestroy {
    pCRPhanUngs: IPCRPhanUng[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private pCRPhanUngService: PCRPhanUngService,
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
            this.pCRPhanUngService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IPCRPhanUng[]>) => (this.pCRPhanUngs = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.pCRPhanUngService.query().subscribe(
            (res: HttpResponse<IPCRPhanUng[]>) => {
                this.pCRPhanUngs = res.body;
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
        this.registerChangeInPCRPhanUngs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPCRPhanUng) {
        return item.id;
    }

    registerChangeInPCRPhanUngs() {
        this.eventSubscriber = this.eventManager.subscribe('pCRPhanUngListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
