import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICapBac } from 'app/shared/model/cap-bac.model';
import { Principal } from 'app/core';
import { CapBacService } from './cap-bac.service';

@Component({
    selector: 'jhi-cap-bac',
    templateUrl: './cap-bac.component.html'
})
export class CapBacComponent implements OnInit, OnDestroy {
    capBacs: ICapBac[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private capBacService: CapBacService,
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
            this.capBacService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<ICapBac[]>) => (this.capBacs = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.capBacService.query().subscribe(
            (res: HttpResponse<ICapBac[]>) => {
                this.capBacs = res.body;
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
        this.registerChangeInCapBacs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICapBac) {
        return item.id;
    }

    registerChangeInCapBacs() {
        this.eventSubscriber = this.eventManager.subscribe('capBacListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
