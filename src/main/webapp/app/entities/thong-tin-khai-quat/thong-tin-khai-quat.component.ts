import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IThongTinKhaiQuat } from 'app/shared/model/thong-tin-khai-quat.model';
import { Principal } from 'app/core';
import { ThongTinKhaiQuatService } from './thong-tin-khai-quat.service';

@Component({
    selector: 'jhi-thong-tin-khai-quat',
    templateUrl: './thong-tin-khai-quat.component.html'
})
export class ThongTinKhaiQuatComponent implements OnInit, OnDestroy {
    thongTinKhaiQuats: IThongTinKhaiQuat[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private thongTinKhaiQuatService: ThongTinKhaiQuatService,
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
            this.thongTinKhaiQuatService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IThongTinKhaiQuat[]>) => (this.thongTinKhaiQuats = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.thongTinKhaiQuatService.query().subscribe(
            (res: HttpResponse<IThongTinKhaiQuat[]>) => {
                this.thongTinKhaiQuats = res.body;
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
        this.registerChangeInThongTinKhaiQuats();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IThongTinKhaiQuat) {
        return item.id;
    }

    registerChangeInThongTinKhaiQuats() {
        this.eventSubscriber = this.eventManager.subscribe('thongTinKhaiQuatListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
