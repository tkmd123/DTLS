import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMappingDotBien } from 'app/shared/model/mapping-dot-bien.model';
import { Principal } from 'app/core';
import { MappingDotBienService } from './mapping-dot-bien.service';

@Component({
    selector: 'jhi-mapping-dot-bien',
    templateUrl: './mapping-dot-bien.component.html'
})
export class MappingDotBienComponent implements OnInit, OnDestroy {
    mappingDotBiens: IMappingDotBien[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private mappingDotBienService: MappingDotBienService,
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
            this.mappingDotBienService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IMappingDotBien[]>) => (this.mappingDotBiens = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.mappingDotBienService.query().subscribe(
            (res: HttpResponse<IMappingDotBien[]>) => {
                this.mappingDotBiens = res.body;
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
        this.registerChangeInMappingDotBiens();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMappingDotBien) {
        return item.id;
    }

    registerChangeInMappingDotBiens() {
        this.eventSubscriber = this.eventManager.subscribe('mappingDotBienListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
