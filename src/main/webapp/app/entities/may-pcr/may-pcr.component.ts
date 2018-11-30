import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMayPCR } from 'app/shared/model/may-pcr.model';
import { Principal } from 'app/core';
import { MayPCRService } from './may-pcr.service';

@Component({
    selector: 'jhi-may-pcr',
    templateUrl: './may-pcr.component.html'
})
export class MayPCRComponent implements OnInit, OnDestroy {
    mayPCRS: IMayPCR[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private mayPCRService: MayPCRService,
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
            this.mayPCRService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IMayPCR[]>) => (this.mayPCRS = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.mayPCRService.query().subscribe(
            (res: HttpResponse<IMayPCR[]>) => {
                this.mayPCRS = res.body;
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
        this.registerChangeInMayPCRS();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMayPCR) {
        return item.id;
    }

    registerChangeInMayPCRS() {
        this.eventSubscriber = this.eventManager.subscribe('mayPCRListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
