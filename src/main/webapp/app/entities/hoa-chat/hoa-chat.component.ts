import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IHoaChat } from 'app/shared/model/hoa-chat.model';
import { Principal } from 'app/core';
import { HoaChatService } from './hoa-chat.service';

@Component({
    selector: 'jhi-hoa-chat',
    templateUrl: './hoa-chat.component.html'
})
export class HoaChatComponent implements OnInit, OnDestroy {
    hoaChats: IHoaChat[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private hoaChatService: HoaChatService,
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
            this.hoaChatService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IHoaChat[]>) => (this.hoaChats = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.hoaChatService.query().subscribe(
            (res: HttpResponse<IHoaChat[]>) => {
                this.hoaChats = res.body;
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
        this.registerChangeInHoaChats();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IHoaChat) {
        return item.id;
    }

    registerChangeInHoaChats() {
        this.eventSubscriber = this.eventManager.subscribe('hoaChatListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
