import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMauTachChiet } from 'app/shared/model/mau-tach-chiet.model';
import { Principal } from 'app/core';
import { MauTachChietService } from './mau-tach-chiet.service';

@Component({
    selector: 'jhi-mau-tach-chiet',
    templateUrl: './mau-tach-chiet.component.html'
})
export class MauTachChietComponent implements OnInit, OnDestroy {
    mauTachChiets: IMauTachChiet[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private mauTachChietService: MauTachChietService,
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
            this.mauTachChietService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IMauTachChiet[]>) => (this.mauTachChiets = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.mauTachChietService.query().subscribe(
            (res: HttpResponse<IMauTachChiet[]>) => {
                this.mauTachChiets = res.body;
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
        this.registerChangeInMauTachChiets();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMauTachChiet) {
        return item.id;
    }

    registerChangeInMauTachChiets() {
        this.eventSubscriber = this.eventManager.subscribe('mauTachChietListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
