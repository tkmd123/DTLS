import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPCRKetQua } from 'app/shared/model/pcr-ket-qua.model';
import { Principal } from 'app/core';
import { PCRKetQuaService } from './pcr-ket-qua.service';

@Component({
    selector: 'jhi-pcr-ket-qua',
    templateUrl: './pcr-ket-qua.component.html'
})
export class PCRKetQuaComponent implements OnInit, OnDestroy {
    pCRKetQuas: IPCRKetQua[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private pCRKetQuaService: PCRKetQuaService,
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
            this.pCRKetQuaService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IPCRKetQua[]>) => (this.pCRKetQuas = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.pCRKetQuaService.query().subscribe(
            (res: HttpResponse<IPCRKetQua[]>) => {
                this.pCRKetQuas = res.body;
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
        this.registerChangeInPCRKetQuas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPCRKetQua) {
        return item.id;
    }

    registerChangeInPCRKetQuas() {
        this.eventSubscriber = this.eventManager.subscribe('pCRKetQuaListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
