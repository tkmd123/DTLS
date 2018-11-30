import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IQuanHeThanNhan } from 'app/shared/model/quan-he-than-nhan.model';
import { Principal } from 'app/core';
import { QuanHeThanNhanService } from './quan-he-than-nhan.service';

@Component({
    selector: 'jhi-quan-he-than-nhan',
    templateUrl: './quan-he-than-nhan.component.html'
})
export class QuanHeThanNhanComponent implements OnInit, OnDestroy {
    quanHeThanNhans: IQuanHeThanNhan[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private quanHeThanNhanService: QuanHeThanNhanService,
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
            this.quanHeThanNhanService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IQuanHeThanNhan[]>) => (this.quanHeThanNhans = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.quanHeThanNhanService.query().subscribe(
            (res: HttpResponse<IQuanHeThanNhan[]>) => {
                this.quanHeThanNhans = res.body;
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
        this.registerChangeInQuanHeThanNhans();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IQuanHeThanNhan) {
        return item.id;
    }

    registerChangeInQuanHeThanNhans() {
        this.eventSubscriber = this.eventManager.subscribe('quanHeThanNhanListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
