import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITachChiet } from 'app/shared/model/tach-chiet.model';
import { Principal } from 'app/core';
import { TachChietService } from './tach-chiet.service';

@Component({
    selector: 'jhi-tach-chiet',
    templateUrl: './tach-chiet.component.html'
})
export class TachChietComponent implements OnInit, OnDestroy {
    tachChiets: ITachChiet[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private tachChietService: TachChietService,
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
            this.tachChietService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<ITachChiet[]>) => (this.tachChiets = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.tachChietService.query().subscribe(
            (res: HttpResponse<ITachChiet[]>) => {
                this.tachChiets = res.body;
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
        this.registerChangeInTachChiets();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITachChiet) {
        return item.id;
    }

    registerChangeInTachChiets() {
        this.eventSubscriber = this.eventManager.subscribe('tachChietListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
