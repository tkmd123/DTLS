import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IHoSoGiamDinh } from 'app/shared/model/ho-so-giam-dinh.model';
import { HoSoGiamDinhService } from './ho-so-giam-dinh.service';
import { IHoSoThanNhan } from 'app/shared/model/ho-so-than-nhan.model';
import { HoSoThanNhanService } from 'app/entities/ho-so-than-nhan';
import { IHoSoLietSi } from 'app/shared/model/ho-so-liet-si.model';
import { HoSoLietSiService } from 'app/entities/ho-so-liet-si';
import { INhanVien } from 'app/shared/model/nhan-vien.model';
import { NhanVienService } from 'app/entities/nhan-vien';

@Component({
    selector: 'jhi-ho-so-giam-dinh-update',
    templateUrl: './ho-so-giam-dinh-update.component.html'
})
export class HoSoGiamDinhUpdateComponent implements OnInit {
    hoSoGiamDinh: IHoSoGiamDinh;
    isSaving: boolean;

    hosothannhans: IHoSoThanNhan[];

    hosolietsis: IHoSoLietSi[];

    nhanviens: INhanVien[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private hoSoGiamDinhService: HoSoGiamDinhService,
        private hoSoThanNhanService: HoSoThanNhanService,
        private hoSoLietSiService: HoSoLietSiService,
        private nhanVienService: NhanVienService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ hoSoGiamDinh }) => {
            this.hoSoGiamDinh = hoSoGiamDinh;
        });
        this.hoSoThanNhanService.query().subscribe(
            (res: HttpResponse<IHoSoThanNhan[]>) => {
                this.hosothannhans = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.hoSoLietSiService.query().subscribe(
            (res: HttpResponse<IHoSoLietSi[]>) => {
                this.hosolietsis = res.body;
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
        if (this.hoSoGiamDinh.id !== undefined) {
            this.subscribeToSaveResponse(this.hoSoGiamDinhService.update(this.hoSoGiamDinh));
        } else {
            this.subscribeToSaveResponse(this.hoSoGiamDinhService.create(this.hoSoGiamDinh));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IHoSoGiamDinh>>) {
        result.subscribe((res: HttpResponse<IHoSoGiamDinh>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackHoSoThanNhanById(index: number, item: IHoSoThanNhan) {
        return item.id;
    }

    trackHoSoLietSiById(index: number, item: IHoSoLietSi) {
        return item.id;
    }

    trackNhanVienById(index: number, item: INhanVien) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
