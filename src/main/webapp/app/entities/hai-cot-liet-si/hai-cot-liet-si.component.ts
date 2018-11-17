import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IHaiCotLietSi } from 'app/shared/model/hai-cot-liet-si.model';
import { Principal } from 'app/core';
import { HaiCotLietSiService } from './hai-cot-liet-si.service';

@Component({
    selector: 'jhi-hai-cot-liet-si',
    templateUrl: './hai-cot-liet-si.component.html'
})
export class HaiCotLietSiComponent implements OnInit, OnDestroy {
    haiCotLietSis: IHaiCotLietSi[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private haiCotLietSiService: HaiCotLietSiService,
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
            this.haiCotLietSiService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IHaiCotLietSi[]>) => (this.haiCotLietSis = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.haiCotLietSiService.query().subscribe(
            (res: HttpResponse<IHaiCotLietSi[]>) => {
                this.haiCotLietSis = res.body;
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
        this.registerChangeInHaiCotLietSis();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IHaiCotLietSi) {
        return item.id;
    }

    registerChangeInHaiCotLietSis() {
        this.eventSubscriber = this.eventManager.subscribe('haiCotLietSiListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
