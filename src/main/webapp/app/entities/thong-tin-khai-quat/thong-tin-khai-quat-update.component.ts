import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IThongTinKhaiQuat } from 'app/shared/model/thong-tin-khai-quat.model';
import { ThongTinKhaiQuatService } from './thong-tin-khai-quat.service';
import { IThongTinMo } from 'app/shared/model/thong-tin-mo.model';
import { ThongTinMoService } from 'app/entities/thong-tin-mo';

@Component({
    selector: 'jhi-thong-tin-khai-quat-update',
    templateUrl: './thong-tin-khai-quat-update.component.html'
})
export class ThongTinKhaiQuatUpdateComponent implements OnInit {
    thongTinKhaiQuat: IThongTinKhaiQuat;
    isSaving: boolean;

    thongtinmos: IThongTinMo[];
    thoiGianKhaiQuat: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private thongTinKhaiQuatService: ThongTinKhaiQuatService,
        private thongTinMoService: ThongTinMoService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ thongTinKhaiQuat }) => {
            this.thongTinKhaiQuat = thongTinKhaiQuat;
            this.thoiGianKhaiQuat =
                this.thongTinKhaiQuat.thoiGianKhaiQuat != null ? this.thongTinKhaiQuat.thoiGianKhaiQuat.format(DATE_TIME_FORMAT) : null;
        });
        this.thongTinMoService.query().subscribe(
            (res: HttpResponse<IThongTinMo[]>) => {
                this.thongtinmos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.thongTinKhaiQuat.thoiGianKhaiQuat = this.thoiGianKhaiQuat != null ? moment(this.thoiGianKhaiQuat, DATE_TIME_FORMAT) : null;
        if (this.thongTinKhaiQuat.id !== undefined) {
            this.subscribeToSaveResponse(this.thongTinKhaiQuatService.update(this.thongTinKhaiQuat));
        } else {
            this.subscribeToSaveResponse(this.thongTinKhaiQuatService.create(this.thongTinKhaiQuat));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IThongTinKhaiQuat>>) {
        result.subscribe((res: HttpResponse<IThongTinKhaiQuat>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackThongTinMoById(index: number, item: IThongTinMo) {
        return item.id;
    }
}
