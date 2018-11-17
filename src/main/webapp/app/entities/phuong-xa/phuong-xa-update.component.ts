import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPhuongXa } from 'app/shared/model/phuong-xa.model';
import { PhuongXaService } from './phuong-xa.service';
import { IQuanHuyen } from 'app/shared/model/quan-huyen.model';
import { QuanHuyenService } from 'app/entities/quan-huyen';

@Component({
    selector: 'jhi-phuong-xa-update',
    templateUrl: './phuong-xa-update.component.html'
})
export class PhuongXaUpdateComponent implements OnInit {
    phuongXa: IPhuongXa;
    isSaving: boolean;

    quanhuyens: IQuanHuyen[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private phuongXaService: PhuongXaService,
        private quanHuyenService: QuanHuyenService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ phuongXa }) => {
            this.phuongXa = phuongXa;
        });
        this.quanHuyenService.query().subscribe(
            (res: HttpResponse<IQuanHuyen[]>) => {
                this.quanhuyens = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.phuongXa.id !== undefined) {
            this.subscribeToSaveResponse(this.phuongXaService.update(this.phuongXa));
        } else {
            this.subscribeToSaveResponse(this.phuongXaService.create(this.phuongXa));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPhuongXa>>) {
        result.subscribe((res: HttpResponse<IPhuongXa>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackQuanHuyenById(index: number, item: IQuanHuyen) {
        return item.id;
    }
}
