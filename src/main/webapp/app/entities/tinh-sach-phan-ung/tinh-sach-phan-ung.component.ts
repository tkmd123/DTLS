import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITinhSachPhanUng } from 'app/shared/model/tinh-sach-phan-ung.model';
import { Principal } from 'app/core';
import { TinhSachPhanUngService } from './tinh-sach-phan-ung.service';

@Component({
    selector: 'jhi-tinh-sach-phan-ung',
    templateUrl: './tinh-sach-phan-ung.component.html'
})
export class TinhSachPhanUngComponent implements OnInit, OnDestroy {
    tinhSachPhanUngs: ITinhSachPhanUng[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private tinhSachPhanUngService: TinhSachPhanUngService,
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
            this.tinhSachPhanUngService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<ITinhSachPhanUng[]>) => (this.tinhSachPhanUngs = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.tinhSachPhanUngService.query().subscribe(
            (res: HttpResponse<ITinhSachPhanUng[]>) => {
                this.tinhSachPhanUngs = res.body;
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
        this.registerChangeInTinhSachPhanUngs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITinhSachPhanUng) {
        return item.id;
    }

    registerChangeInTinhSachPhanUngs() {
        this.eventSubscriber = this.eventManager.subscribe('tinhSachPhanUngListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
