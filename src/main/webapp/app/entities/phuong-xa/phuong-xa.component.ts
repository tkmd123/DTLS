import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPhuongXa } from 'app/shared/model/phuong-xa.model';
import { Principal } from 'app/core';
import { PhuongXaService } from './phuong-xa.service';

@Component({
    selector: 'jhi-phuong-xa',
    templateUrl: './phuong-xa.component.html'
})
export class PhuongXaComponent implements OnInit, OnDestroy {
    phuongXas: IPhuongXa[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private phuongXaService: PhuongXaService,
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
            this.phuongXaService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IPhuongXa[]>) => (this.phuongXas = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.phuongXaService.query().subscribe(
            (res: HttpResponse<IPhuongXa[]>) => {
                this.phuongXas = res.body;
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
        this.registerChangeInPhuongXas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPhuongXa) {
        return item.id;
    }

    registerChangeInPhuongXas() {
        this.eventSubscriber = this.eventManager.subscribe('phuongXaListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
