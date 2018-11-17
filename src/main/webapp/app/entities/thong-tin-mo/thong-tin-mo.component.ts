import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IThongTinMo } from 'app/shared/model/thong-tin-mo.model';
import { Principal } from 'app/core';
import { ThongTinMoService } from './thong-tin-mo.service';

@Component({
    selector: 'jhi-thong-tin-mo',
    templateUrl: './thong-tin-mo.component.html'
})
export class ThongTinMoComponent implements OnInit, OnDestroy {
    thongTinMos: IThongTinMo[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private thongTinMoService: ThongTinMoService,
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
            this.thongTinMoService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IThongTinMo[]>) => (this.thongTinMos = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.thongTinMoService.query().subscribe(
            (res: HttpResponse<IThongTinMo[]>) => {
                this.thongTinMos = res.body;
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
        this.registerChangeInThongTinMos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IThongTinMo) {
        return item.id;
    }

    registerChangeInThongTinMos() {
        this.eventSubscriber = this.eventManager.subscribe('thongTinMoListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
