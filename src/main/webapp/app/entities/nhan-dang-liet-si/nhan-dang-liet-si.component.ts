import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { INhanDangLietSi } from 'app/shared/model/nhan-dang-liet-si.model';
import { Principal } from 'app/core';
import { NhanDangLietSiService } from './nhan-dang-liet-si.service';

@Component({
    selector: 'jhi-nhan-dang-liet-si',
    templateUrl: './nhan-dang-liet-si.component.html'
})
export class NhanDangLietSiComponent implements OnInit, OnDestroy {
    nhanDangLietSis: INhanDangLietSi[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private nhanDangLietSiService: NhanDangLietSiService,
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
            this.nhanDangLietSiService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<INhanDangLietSi[]>) => (this.nhanDangLietSis = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.nhanDangLietSiService.query().subscribe(
            (res: HttpResponse<INhanDangLietSi[]>) => {
                this.nhanDangLietSis = res.body;
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
        this.registerChangeInNhanDangLietSis();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: INhanDangLietSi) {
        return item.id;
    }

    registerChangeInNhanDangLietSis() {
        this.eventSubscriber = this.eventManager.subscribe('nhanDangLietSiListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
