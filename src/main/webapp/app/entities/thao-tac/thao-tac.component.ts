import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IThaoTac } from 'app/shared/model/thao-tac.model';
import { Principal } from 'app/core';
import { ThaoTacService } from './thao-tac.service';

@Component({
    selector: 'jhi-thao-tac',
    templateUrl: './thao-tac.component.html'
})
export class ThaoTacComponent implements OnInit, OnDestroy {
    thaoTacs: IThaoTac[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private thaoTacService: ThaoTacService,
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
            this.thaoTacService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IThaoTac[]>) => (this.thaoTacs = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.thaoTacService.query().subscribe(
            (res: HttpResponse<IThaoTac[]>) => {
                this.thaoTacs = res.body;
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
        this.registerChangeInThaoTacs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IThaoTac) {
        return item.id;
    }

    registerChangeInThaoTacs() {
        this.eventSubscriber = this.eventManager.subscribe('thaoTacListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
