import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IDiVat } from 'app/shared/model/di-vat.model';
import { DiVatService } from './di-vat.service';
import { IThongTinKhaiQuat } from 'app/shared/model/thong-tin-khai-quat.model';
import { ThongTinKhaiQuatService } from 'app/entities/thong-tin-khai-quat';
import { ILoaiDiVat } from 'app/shared/model/loai-di-vat.model';
import { LoaiDiVatService } from 'app/entities/loai-di-vat';

@Component({
    selector: 'jhi-di-vat-update',
    templateUrl: './di-vat-update.component.html'
})
export class DiVatUpdateComponent implements OnInit {
    diVat: IDiVat;
    isSaving: boolean;

    thongtinkhaiquats: IThongTinKhaiQuat[];

    loaidivats: ILoaiDiVat[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private diVatService: DiVatService,
        private thongTinKhaiQuatService: ThongTinKhaiQuatService,
        private loaiDiVatService: LoaiDiVatService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ diVat }) => {
            this.diVat = diVat;
        });
        this.thongTinKhaiQuatService.query().subscribe(
            (res: HttpResponse<IThongTinKhaiQuat[]>) => {
                this.thongtinkhaiquats = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.loaiDiVatService.query().subscribe(
            (res: HttpResponse<ILoaiDiVat[]>) => {
                this.loaidivats = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.diVat.id !== undefined) {
            this.subscribeToSaveResponse(this.diVatService.update(this.diVat));
        } else {
            this.subscribeToSaveResponse(this.diVatService.create(this.diVat));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDiVat>>) {
        result.subscribe((res: HttpResponse<IDiVat>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackThongTinKhaiQuatById(index: number, item: IThongTinKhaiQuat) {
        return item.id;
    }

    trackLoaiDiVatById(index: number, item: ILoaiDiVat) {
        return item.id;
    }
}
