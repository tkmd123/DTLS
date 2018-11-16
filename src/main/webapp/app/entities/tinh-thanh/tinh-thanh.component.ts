import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITinhThanh } from 'app/shared/model/tinh-thanh.model';
import { Principal } from 'app/core';
import { TinhThanhService } from './tinh-thanh.service';

@Component({
    selector: 'jhi-tinh-thanh',
    templateUrl: './tinh-thanh.component.html'
})
export class TinhThanhComponent implements OnInit, OnDestroy {
    tinhThanhs: ITinhThanh[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private tinhThanhService: TinhThanhService,
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
            this.tinhThanhService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<ITinhThanh[]>) => (this.tinhThanhs = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.tinhThanhService.query().subscribe(
            (res: HttpResponse<ITinhThanh[]>) => {
                this.tinhThanhs = res.body;
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
        this.registerChangeInTinhThanhs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITinhThanh) {
        return item.id;
    }

    registerChangeInTinhThanhs() {
        this.eventSubscriber = this.eventManager.subscribe('tinhThanhListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
