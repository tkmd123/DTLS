import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IHoSoGiamDinh } from 'app/shared/model/ho-so-giam-dinh.model';
import { Principal } from 'app/core';
import { HoSoGiamDinhService } from './ho-so-giam-dinh.service';

@Component({
    selector: 'jhi-ho-so-giam-dinh',
    templateUrl: './ho-so-giam-dinh.component.html'
})
export class HoSoGiamDinhComponent implements OnInit, OnDestroy {
    hoSoGiamDinhs: IHoSoGiamDinh[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private hoSoGiamDinhService: HoSoGiamDinhService,
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
            this.hoSoGiamDinhService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IHoSoGiamDinh[]>) => (this.hoSoGiamDinhs = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.hoSoGiamDinhService.query().subscribe(
            (res: HttpResponse<IHoSoGiamDinh[]>) => {
                this.hoSoGiamDinhs = res.body;
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
        this.registerChangeInHoSoGiamDinhs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IHoSoGiamDinh) {
        return item.id;
    }

    registerChangeInHoSoGiamDinhs() {
        this.eventSubscriber = this.eventManager.subscribe('hoSoGiamDinhListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
