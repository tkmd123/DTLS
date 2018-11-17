import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IQuanHuyen } from 'app/shared/model/quan-huyen.model';
import { QuanHuyenService } from './quan-huyen.service';
import { ITinhThanh } from 'app/shared/model/tinh-thanh.model';
import { TinhThanhService } from 'app/entities/tinh-thanh';

@Component({
    selector: 'jhi-quan-huyen-update',
    templateUrl: './quan-huyen-update.component.html'
})
export class QuanHuyenUpdateComponent implements OnInit {
    quanHuyen: IQuanHuyen;
    isSaving: boolean;

    tinhthanhs: ITinhThanh[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private quanHuyenService: QuanHuyenService,
        private tinhThanhService: TinhThanhService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ quanHuyen }) => {
            this.quanHuyen = quanHuyen;
        });
        this.tinhThanhService.query().subscribe(
            (res: HttpResponse<ITinhThanh[]>) => {
                this.tinhthanhs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.quanHuyen.id !== undefined) {
            this.subscribeToSaveResponse(this.quanHuyenService.update(this.quanHuyen));
        } else {
            this.subscribeToSaveResponse(this.quanHuyenService.create(this.quanHuyen));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQuanHuyen>>) {
        result.subscribe((res: HttpResponse<IQuanHuyen>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackTinhThanhById(index: number, item: ITinhThanh) {
        return item.id;
    }
}
