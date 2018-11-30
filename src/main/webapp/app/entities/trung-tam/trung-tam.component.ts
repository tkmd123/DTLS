import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITrungTam } from 'app/shared/model/trung-tam.model';
import { Principal } from 'app/core';
import { TrungTamService } from './trung-tam.service';

@Component({
    selector: 'jhi-trung-tam',
    templateUrl: './trung-tam.component.html'
})
export class TrungTamComponent implements OnInit, OnDestroy {
    trungTams: ITrungTam[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private trungTamService: TrungTamService,
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
            this.trungTamService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<ITrungTam[]>) => (this.trungTams = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.trungTamService.query().subscribe(
            (res: HttpResponse<ITrungTam[]>) => {
                this.trungTams = res.body;
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
        this.registerChangeInTrungTams();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITrungTam) {
        return item.id;
    }

    registerChangeInTrungTams() {
        this.eventSubscriber = this.eventManager.subscribe('trungTamListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
