import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IThongTinADN } from 'app/shared/model/thong-tin-adn.model';
import { Principal } from 'app/core';
import { ThongTinADNService } from './thong-tin-adn.service';

@Component({
    selector: 'jhi-thong-tin-adn',
    templateUrl: './thong-tin-adn.component.html'
})
export class ThongTinADNComponent implements OnInit, OnDestroy {
    thongTinADNS: IThongTinADN[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private thongTinADNService: ThongTinADNService,
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
            this.thongTinADNService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IThongTinADN[]>) => (this.thongTinADNS = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.thongTinADNService.query().subscribe(
            (res: HttpResponse<IThongTinADN[]>) => {
                this.thongTinADNS = res.body;
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
        this.registerChangeInThongTinADNS();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IThongTinADN) {
        return item.id;
    }

    registerChangeInThongTinADNS() {
        this.eventSubscriber = this.eventManager.subscribe('thongTinADNListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
