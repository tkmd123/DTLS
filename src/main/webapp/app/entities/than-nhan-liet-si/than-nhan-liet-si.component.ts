import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IThanNhanLietSi } from 'app/shared/model/than-nhan-liet-si.model';
import { Principal } from 'app/core';
import { ThanNhanLietSiService } from './than-nhan-liet-si.service';

@Component({
    selector: 'jhi-than-nhan-liet-si',
    templateUrl: './than-nhan-liet-si.component.html'
})
export class ThanNhanLietSiComponent implements OnInit, OnDestroy {
    thanNhanLietSis: IThanNhanLietSi[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private thanNhanLietSiService: ThanNhanLietSiService,
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
            this.thanNhanLietSiService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IThanNhanLietSi[]>) => (this.thanNhanLietSis = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.thanNhanLietSiService.query().subscribe(
            (res: HttpResponse<IThanNhanLietSi[]>) => {
                this.thanNhanLietSis = res.body;
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
        this.registerChangeInThanNhanLietSis();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IThanNhanLietSi) {
        return item.id;
    }

    registerChangeInThanNhanLietSis() {
        this.eventSubscriber = this.eventManager.subscribe('thanNhanLietSiListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
