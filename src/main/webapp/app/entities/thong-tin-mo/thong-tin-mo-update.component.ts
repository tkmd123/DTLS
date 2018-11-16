import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IThongTinMo } from 'app/shared/model/thong-tin-mo.model';
import { ThongTinMoService } from './thong-tin-mo.service';
import { INghiaTrang } from 'app/shared/model/nghia-trang.model';
import { NghiaTrangService } from 'app/entities/nghia-trang';

@Component({
    selector: 'jhi-thong-tin-mo-update',
    templateUrl: './thong-tin-mo-update.component.html'
})
export class ThongTinMoUpdateComponent implements OnInit {
    thongTinMo: IThongTinMo;
    isSaving: boolean;

    nghiatrangs: INghiaTrang[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private thongTinMoService: ThongTinMoService,
        private nghiaTrangService: NghiaTrangService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ thongTinMo }) => {
            this.thongTinMo = thongTinMo;
        });
        this.nghiaTrangService.query().subscribe(
            (res: HttpResponse<INghiaTrang[]>) => {
                this.nghiatrangs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.thongTinMo.id !== undefined) {
            this.subscribeToSaveResponse(this.thongTinMoService.update(this.thongTinMo));
        } else {
            this.subscribeToSaveResponse(this.thongTinMoService.create(this.thongTinMo));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IThongTinMo>>) {
        result.subscribe((res: HttpResponse<IThongTinMo>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackNghiaTrangById(index: number, item: INghiaTrang) {
        return item.id;
    }
}
