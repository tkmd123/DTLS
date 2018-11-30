import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IVungADN } from 'app/shared/model/vung-adn.model';
import { Principal } from 'app/core';
import { VungADNService } from './vung-adn.service';

@Component({
    selector: 'jhi-vung-adn',
    templateUrl: './vung-adn.component.html'
})
export class VungADNComponent implements OnInit, OnDestroy {
    vungADNS: IVungADN[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private vungADNService: VungADNService,
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
            this.vungADNService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IVungADN[]>) => (this.vungADNS = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.vungADNService.query().subscribe(
            (res: HttpResponse<IVungADN[]>) => {
                this.vungADNS = res.body;
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
        this.registerChangeInVungADNS();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IVungADN) {
        return item.id;
    }

    registerChangeInVungADNS() {
        this.eventSubscriber = this.eventManager.subscribe('vungADNListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
