import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITinhSach } from 'app/shared/model/tinh-sach.model';
import { Principal } from 'app/core';
import { TinhSachService } from './tinh-sach.service';

@Component({
    selector: 'jhi-tinh-sach',
    templateUrl: './tinh-sach.component.html'
})
export class TinhSachComponent implements OnInit, OnDestroy {
    tinhSaches: ITinhSach[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private tinhSachService: TinhSachService,
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
            this.tinhSachService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<ITinhSach[]>) => (this.tinhSaches = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.tinhSachService.query().subscribe(
            (res: HttpResponse<ITinhSach[]>) => {
                this.tinhSaches = res.body;
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
        this.registerChangeInTinhSaches();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITinhSach) {
        return item.id;
    }

    registerChangeInTinhSaches() {
        this.eventSubscriber = this.eventManager.subscribe('tinhSachListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
