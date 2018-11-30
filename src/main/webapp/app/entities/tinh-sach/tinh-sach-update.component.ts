import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { ITinhSach } from 'app/shared/model/tinh-sach.model';
import { TinhSachService } from './tinh-sach.service';
import { INhanVien } from 'app/shared/model/nhan-vien.model';
import { NhanVienService } from 'app/entities/nhan-vien';
import { IMayPCR } from 'app/shared/model/may-pcr.model';
import { MayPCRService } from 'app/entities/may-pcr';

@Component({
    selector: 'jhi-tinh-sach-update',
    templateUrl: './tinh-sach-update.component.html'
})
export class TinhSachUpdateComponent implements OnInit {
    tinhSach: ITinhSach;
    isSaving: boolean;

    nhanviens: INhanVien[];

    maypcrs: IMayPCR[];
    thoiGianThucHien: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private tinhSachService: TinhSachService,
        private nhanVienService: NhanVienService,
        private mayPCRService: MayPCRService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ tinhSach }) => {
            this.tinhSach = tinhSach;
            this.thoiGianThucHien = this.tinhSach.thoiGianThucHien != null ? this.tinhSach.thoiGianThucHien.format(DATE_TIME_FORMAT) : null;
        });
        this.nhanVienService.query().subscribe(
            (res: HttpResponse<INhanVien[]>) => {
                this.nhanviens = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.mayPCRService.query().subscribe(
            (res: HttpResponse<IMayPCR[]>) => {
                this.maypcrs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.tinhSach.thoiGianThucHien = this.thoiGianThucHien != null ? moment(this.thoiGianThucHien, DATE_TIME_FORMAT) : null;
        if (this.tinhSach.id !== undefined) {
            this.subscribeToSaveResponse(this.tinhSachService.update(this.tinhSach));
        } else {
            this.subscribeToSaveResponse(this.tinhSachService.create(this.tinhSach));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITinhSach>>) {
        result.subscribe((res: HttpResponse<ITinhSach>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackNhanVienById(index: number, item: INhanVien) {
        return item.id;
    }

    trackMayPCRById(index: number, item: IMayPCR) {
        return item.id;
    }
}
