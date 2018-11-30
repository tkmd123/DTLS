import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPCRPhanUngChuan } from 'app/shared/model/pcr-phan-ung-chuan.model';
import { Principal } from 'app/core';
import { PCRPhanUngChuanService } from './pcr-phan-ung-chuan.service';

@Component({
    selector: 'jhi-pcr-phan-ung-chuan',
    templateUrl: './pcr-phan-ung-chuan.component.html'
})
export class PCRPhanUngChuanComponent implements OnInit, OnDestroy {
    pCRPhanUngChuans: IPCRPhanUngChuan[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private pCRPhanUngChuanService: PCRPhanUngChuanService,
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
            this.pCRPhanUngChuanService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IPCRPhanUngChuan[]>) => (this.pCRPhanUngChuans = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.pCRPhanUngChuanService.query().subscribe(
            (res: HttpResponse<IPCRPhanUngChuan[]>) => {
                this.pCRPhanUngChuans = res.body;
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
        this.registerChangeInPCRPhanUngChuans();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPCRPhanUngChuan) {
        return item.id;
    }

    registerChangeInPCRPhanUngChuans() {
        this.eventSubscriber = this.eventManager.subscribe('pCRPhanUngChuanListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
