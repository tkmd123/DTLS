import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IPCR } from 'app/shared/model/pcr.model';
import { PCRService } from './pcr.service';
import { IMayPCR } from 'app/shared/model/may-pcr.model';
import { MayPCRService } from 'app/entities/may-pcr';
import { INhanVien } from 'app/shared/model/nhan-vien.model';
import { NhanVienService } from 'app/entities/nhan-vien';

@Component({
    selector: 'jhi-pcr-update',
    templateUrl: './pcr-update.component.html'
})
export class PCRUpdateComponent implements OnInit {
    pCR: IPCR;
    isSaving: boolean;

    maypcrs: IMayPCR[];

    nhanviens: INhanVien[];
    thoiGianThucHien: string;
    thoiGianBatDau: string;
    thoiGianKetThuc: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private pCRService: PCRService,
        private mayPCRService: MayPCRService,
        private nhanVienService: NhanVienService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ pCR }) => {
            this.pCR = pCR;
            this.thoiGianThucHien = this.pCR.thoiGianThucHien != null ? this.pCR.thoiGianThucHien.format(DATE_TIME_FORMAT) : null;
            this.thoiGianBatDau = this.pCR.thoiGianBatDau != null ? this.pCR.thoiGianBatDau.format(DATE_TIME_FORMAT) : null;
            this.thoiGianKetThuc = this.pCR.thoiGianKetThuc != null ? this.pCR.thoiGianKetThuc.format(DATE_TIME_FORMAT) : null;
        });
        this.mayPCRService.query().subscribe(
            (res: HttpResponse<IMayPCR[]>) => {
                this.maypcrs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.nhanVienService.query().subscribe(
            (res: HttpResponse<INhanVien[]>) => {
                this.nhanviens = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.pCR.thoiGianThucHien = this.thoiGianThucHien != null ? moment(this.thoiGianThucHien, DATE_TIME_FORMAT) : null;
        this.pCR.thoiGianBatDau = this.thoiGianBatDau != null ? moment(this.thoiGianBatDau, DATE_TIME_FORMAT) : null;
        this.pCR.thoiGianKetThuc = this.thoiGianKetThuc != null ? moment(this.thoiGianKetThuc, DATE_TIME_FORMAT) : null;
        if (this.pCR.id !== undefined) {
            this.subscribeToSaveResponse(this.pCRService.update(this.pCR));
        } else {
            this.subscribeToSaveResponse(this.pCRService.create(this.pCR));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPCR>>) {
        result.subscribe((res: HttpResponse<IPCR>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackMayPCRById(index: number, item: IMayPCR) {
        return item.id;
    }

    trackNhanVienById(index: number, item: INhanVien) {
        return item.id;
    }
}
