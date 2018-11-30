import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IHoaChatMacDinh } from 'app/shared/model/hoa-chat-mac-dinh.model';
import { Principal } from 'app/core';
import { HoaChatMacDinhService } from './hoa-chat-mac-dinh.service';

@Component({
    selector: 'jhi-hoa-chat-mac-dinh',
    templateUrl: './hoa-chat-mac-dinh.component.html'
})
export class HoaChatMacDinhComponent implements OnInit, OnDestroy {
    hoaChatMacDinhs: IHoaChatMacDinh[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private hoaChatMacDinhService: HoaChatMacDinhService,
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
            this.hoaChatMacDinhService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IHoaChatMacDinh[]>) => (this.hoaChatMacDinhs = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.hoaChatMacDinhService.query().subscribe(
            (res: HttpResponse<IHoaChatMacDinh[]>) => {
                this.hoaChatMacDinhs = res.body;
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
        this.registerChangeInHoaChatMacDinhs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IHoaChatMacDinh) {
        return item.id;
    }

    registerChangeInHoaChatMacDinhs() {
        this.eventSubscriber = this.eventManager.subscribe('hoaChatMacDinhListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
