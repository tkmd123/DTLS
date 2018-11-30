import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { ITachChiet } from 'app/shared/model/tach-chiet.model';
import { TachChietService } from './tach-chiet.service';
import { INhanVien } from 'app/shared/model/nhan-vien.model';
import { NhanVienService } from 'app/entities/nhan-vien';

@Component({
    selector: 'jhi-tach-chiet-update',
    templateUrl: './tach-chiet-update.component.html'
})
export class TachChietUpdateComponent implements OnInit {
    tachChiet: ITachChiet;
    isSaving: boolean;

    nhanviens: INhanVien[];
    thoiGianThucHien: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private tachChietService: TachChietService,
        private nhanVienService: NhanVienService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ tachChiet }) => {
            this.tachChiet = tachChiet;
            this.thoiGianThucHien =
                this.tachChiet.thoiGianThucHien != null ? this.tachChiet.thoiGianThucHien.format(DATE_TIME_FORMAT) : null;
        });
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
        this.tachChiet.thoiGianThucHien = this.thoiGianThucHien != null ? moment(this.thoiGianThucHien, DATE_TIME_FORMAT) : null;
        if (this.tachChiet.id !== undefined) {
            this.subscribeToSaveResponse(this.tachChietService.update(this.tachChiet));
        } else {
            this.subscribeToSaveResponse(this.tachChietService.create(this.tachChiet));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITachChiet>>) {
        result.subscribe((res: HttpResponse<ITachChiet>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
}
