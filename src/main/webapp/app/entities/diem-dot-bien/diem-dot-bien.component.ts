import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDiemDotBien } from 'app/shared/model/diem-dot-bien.model';
import { Principal } from 'app/core';
import { DiemDotBienService } from './diem-dot-bien.service';

@Component({
    selector: 'jhi-diem-dot-bien',
    templateUrl: './diem-dot-bien.component.html'
})
export class DiemDotBienComponent implements OnInit, OnDestroy {
    diemDotBiens: IDiemDotBien[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private diemDotBienService: DiemDotBienService,
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
            this.diemDotBienService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IDiemDotBien[]>) => (this.diemDotBiens = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.diemDotBienService.query().subscribe(
            (res: HttpResponse<IDiemDotBien[]>) => {
                this.diemDotBiens = res.body;
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
        this.registerChangeInDiemDotBiens();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDiemDotBien) {
        return item.id;
    }

    registerChangeInDiemDotBiens() {
        this.eventSubscriber = this.eventManager.subscribe('diemDotBienListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
