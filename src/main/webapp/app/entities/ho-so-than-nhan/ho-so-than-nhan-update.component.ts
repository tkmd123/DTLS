import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IHoSoThanNhan } from 'app/shared/model/ho-so-than-nhan.model';
import { HoSoThanNhanService } from './ho-so-than-nhan.service';
import { IPhuongXa } from 'app/shared/model/phuong-xa.model';
import { PhuongXaService } from 'app/entities/phuong-xa';

@Component({
    selector: 'jhi-ho-so-than-nhan-update',
    templateUrl: './ho-so-than-nhan-update.component.html'
})
export class HoSoThanNhanUpdateComponent implements OnInit {
    hoSoThanNhan: IHoSoThanNhan;
    isSaving: boolean;

    phuongxas: IPhuongXa[];
    namSinh: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private hoSoThanNhanService: HoSoThanNhanService,
        private phuongXaService: PhuongXaService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ hoSoThanNhan }) => {
            this.hoSoThanNhan = hoSoThanNhan;
            this.namSinh = this.hoSoThanNhan.namSinh != null ? this.hoSoThanNhan.namSinh.format(DATE_TIME_FORMAT) : null;
        });
        this.phuongXaService.query().subscribe(
            (res: HttpResponse<IPhuongXa[]>) => {
                this.phuongxas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.hoSoThanNhan.namSinh = this.namSinh != null ? moment(this.namSinh, DATE_TIME_FORMAT) : null;
        if (this.hoSoThanNhan.id !== undefined) {
            this.subscribeToSaveResponse(this.hoSoThanNhanService.update(this.hoSoThanNhan));
        } else {
            this.subscribeToSaveResponse(this.hoSoThanNhanService.create(this.hoSoThanNhan));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IHoSoThanNhan>>) {
        result.subscribe((res: HttpResponse<IHoSoThanNhan>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPhuongXaById(index: number, item: IPhuongXa) {
        return item.id;
    }
}
