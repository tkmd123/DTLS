import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IChucVu } from 'app/shared/model/chuc-vu.model';
import { Principal } from 'app/core';
import { ChucVuService } from './chuc-vu.service';

@Component({
    selector: 'jhi-chuc-vu',
    templateUrl: './chuc-vu.component.html'
})
export class ChucVuComponent implements OnInit, OnDestroy {
    chucVus: IChucVu[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private chucVuService: ChucVuService,
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
            this.chucVuService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IChucVu[]>) => (this.chucVus = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.chucVuService.query().subscribe(
            (res: HttpResponse<IChucVu[]>) => {
                this.chucVus = res.body;
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
        this.registerChangeInChucVus();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IChucVu) {
        return item.id;
    }

    registerChangeInChucVus() {
        this.eventSubscriber = this.eventManager.subscribe('chucVuListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
