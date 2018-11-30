import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IHoaChatTachChiet } from 'app/shared/model/hoa-chat-tach-chiet.model';
import { Principal } from 'app/core';
import { HoaChatTachChietService } from './hoa-chat-tach-chiet.service';

@Component({
    selector: 'jhi-hoa-chat-tach-chiet',
    templateUrl: './hoa-chat-tach-chiet.component.html'
})
export class HoaChatTachChietComponent implements OnInit, OnDestroy {
    hoaChatTachChiets: IHoaChatTachChiet[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private hoaChatTachChietService: HoaChatTachChietService,
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
            this.hoaChatTachChietService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IHoaChatTachChiet[]>) => (this.hoaChatTachChiets = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.hoaChatTachChietService.query().subscribe(
            (res: HttpResponse<IHoaChatTachChiet[]>) => {
                this.hoaChatTachChiets = res.body;
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
        this.registerChangeInHoaChatTachChiets();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IHoaChatTachChiet) {
        return item.id;
    }

    registerChangeInHoaChatTachChiets() {
        this.eventSubscriber = this.eventManager.subscribe('hoaChatTachChietListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
