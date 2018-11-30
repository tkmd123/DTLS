import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { INhanVien } from 'app/shared/model/nhan-vien.model';
import { Principal } from 'app/core';
import { NhanVienService } from './nhan-vien.service';

@Component({
    selector: 'jhi-nhan-vien',
    templateUrl: './nhan-vien.component.html'
})
export class NhanVienComponent implements OnInit, OnDestroy {
    nhanViens: INhanVien[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private nhanVienService: NhanVienService,
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
            this.nhanVienService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<INhanVien[]>) => (this.nhanViens = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.nhanVienService.query().subscribe(
            (res: HttpResponse<INhanVien[]>) => {
                this.nhanViens = res.body;
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
        this.registerChangeInNhanViens();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: INhanVien) {
        return item.id;
    }

    registerChangeInNhanViens() {
        this.eventSubscriber = this.eventManager.subscribe('nhanVienListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
