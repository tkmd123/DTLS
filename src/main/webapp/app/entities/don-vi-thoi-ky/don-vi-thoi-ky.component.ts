import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDonViThoiKy } from 'app/shared/model/don-vi-thoi-ky.model';
import { Principal } from 'app/core';
import { DonViThoiKyService } from './don-vi-thoi-ky.service';

@Component({
    selector: 'jhi-don-vi-thoi-ky',
    templateUrl: './don-vi-thoi-ky.component.html'
})
export class DonViThoiKyComponent implements OnInit, OnDestroy {
    donViThoiKies: IDonViThoiKy[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private donViThoiKyService: DonViThoiKyService,
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
            this.donViThoiKyService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IDonViThoiKy[]>) => (this.donViThoiKies = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.donViThoiKyService.query().subscribe(
            (res: HttpResponse<IDonViThoiKy[]>) => {
                this.donViThoiKies = res.body;
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
        this.registerChangeInDonViThoiKies();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDonViThoiKy) {
        return item.id;
    }

    registerChangeInDonViThoiKies() {
        this.eventSubscriber = this.eventManager.subscribe('donViThoiKyListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
