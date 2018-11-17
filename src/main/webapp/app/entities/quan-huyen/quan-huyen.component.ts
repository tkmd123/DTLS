import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IQuanHuyen } from 'app/shared/model/quan-huyen.model';
import { Principal } from 'app/core';
import { QuanHuyenService } from './quan-huyen.service';

@Component({
    selector: 'jhi-quan-huyen',
    templateUrl: './quan-huyen.component.html'
})
export class QuanHuyenComponent implements OnInit, OnDestroy {
    quanHuyens: IQuanHuyen[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private quanHuyenService: QuanHuyenService,
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
            this.quanHuyenService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IQuanHuyen[]>) => (this.quanHuyens = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.quanHuyenService.query().subscribe(
            (res: HttpResponse<IQuanHuyen[]>) => {
                this.quanHuyens = res.body;
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
        this.registerChangeInQuanHuyens();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IQuanHuyen) {
        return item.id;
    }

    registerChangeInQuanHuyens() {
        this.eventSubscriber = this.eventManager.subscribe('quanHuyenListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
