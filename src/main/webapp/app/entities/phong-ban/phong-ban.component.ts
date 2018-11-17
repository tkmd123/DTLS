import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPhongBan } from 'app/shared/model/phong-ban.model';
import { Principal } from 'app/core';
import { PhongBanService } from './phong-ban.service';

@Component({
    selector: 'jhi-phong-ban',
    templateUrl: './phong-ban.component.html'
})
export class PhongBanComponent implements OnInit, OnDestroy {
    phongBans: IPhongBan[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private phongBanService: PhongBanService,
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
            this.phongBanService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IPhongBan[]>) => (this.phongBans = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.phongBanService.query().subscribe(
            (res: HttpResponse<IPhongBan[]>) => {
                this.phongBans = res.body;
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
        this.registerChangeInPhongBans();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPhongBan) {
        return item.id;
    }

    registerChangeInPhongBans() {
        this.eventSubscriber = this.eventManager.subscribe('phongBanListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
