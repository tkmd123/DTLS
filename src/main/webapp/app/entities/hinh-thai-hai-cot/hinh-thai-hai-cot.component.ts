import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IHinhThaiHaiCot } from 'app/shared/model/hinh-thai-hai-cot.model';
import { Principal } from 'app/core';
import { HinhThaiHaiCotService } from './hinh-thai-hai-cot.service';

@Component({
    selector: 'jhi-hinh-thai-hai-cot',
    templateUrl: './hinh-thai-hai-cot.component.html'
})
export class HinhThaiHaiCotComponent implements OnInit, OnDestroy {
    hinhThaiHaiCots: IHinhThaiHaiCot[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private hinhThaiHaiCotService: HinhThaiHaiCotService,
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
            this.hinhThaiHaiCotService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IHinhThaiHaiCot[]>) => (this.hinhThaiHaiCots = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.hinhThaiHaiCotService.query().subscribe(
            (res: HttpResponse<IHinhThaiHaiCot[]>) => {
                this.hinhThaiHaiCots = res.body;
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
        this.registerChangeInHinhThaiHaiCots();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IHinhThaiHaiCot) {
        return item.id;
    }

    registerChangeInHinhThaiHaiCots() {
        this.eventSubscriber = this.eventManager.subscribe('hinhThaiHaiCotListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
