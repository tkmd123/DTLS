import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { INhanDang } from 'app/shared/model/nhan-dang.model';
import { Principal } from 'app/core';
import { NhanDangService } from './nhan-dang.service';

@Component({
    selector: 'jhi-nhan-dang',
    templateUrl: './nhan-dang.component.html'
})
export class NhanDangComponent implements OnInit, OnDestroy {
    nhanDangs: INhanDang[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private nhanDangService: NhanDangService,
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
            this.nhanDangService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<INhanDang[]>) => (this.nhanDangs = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.nhanDangService.query().subscribe(
            (res: HttpResponse<INhanDang[]>) => {
                this.nhanDangs = res.body;
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
        this.registerChangeInNhanDangs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: INhanDang) {
        return item.id;
    }

    registerChangeInNhanDangs() {
        this.eventSubscriber = this.eventManager.subscribe('nhanDangListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
