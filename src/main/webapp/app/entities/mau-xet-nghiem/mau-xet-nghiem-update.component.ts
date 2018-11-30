import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IMauXetNghiem } from 'app/shared/model/mau-xet-nghiem.model';
import { MauXetNghiemService } from './mau-xet-nghiem.service';
import { ITinhSach } from 'app/shared/model/tinh-sach.model';
import { TinhSachService } from 'app/entities/tinh-sach';
import { IHoSoGiamDinh } from 'app/shared/model/ho-so-giam-dinh.model';
import { HoSoGiamDinhService } from 'app/entities/ho-so-giam-dinh';
import { INhanVien } from 'app/shared/model/nhan-vien.model';
import { NhanVienService } from 'app/entities/nhan-vien';
import { ILoaiMauXetNghiem } from 'app/shared/model/loai-mau-xet-nghiem.model';
import { LoaiMauXetNghiemService } from 'app/entities/loai-mau-xet-nghiem';
import { IHaiCotLietSi } from 'app/shared/model/hai-cot-liet-si.model';
import { HaiCotLietSiService } from 'app/entities/hai-cot-liet-si';
import { IHoSoThanNhan } from 'app/shared/model/ho-so-than-nhan.model';
import { HoSoThanNhanService } from 'app/entities/ho-so-than-nhan';
import { ILoaiThaoTac } from 'app/shared/model/loai-thao-tac.model';
import { LoaiThaoTacService } from 'app/entities/loai-thao-tac';

@Component({
    selector: 'jhi-mau-xet-nghiem-update',
    templateUrl: './mau-xet-nghiem-update.component.html'
})
export class MauXetNghiemUpdateComponent implements OnInit {
    mauXetNghiem: IMauXetNghiem;
    isSaving: boolean;

    tinhsaches: ITinhSach[];

    hosogiamdinhs: IHoSoGiamDinh[];

    nhanviens: INhanVien[];

    loaimauxetnghiems: ILoaiMauXetNghiem[];

    haicotlietsis: IHaiCotLietSi[];

    hosothannhans: IHoSoThanNhan[];

    loaithaotacs: ILoaiThaoTac[];
    ngayLayMau: string;
    ngayTiepNhan: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private mauXetNghiemService: MauXetNghiemService,
        private tinhSachService: TinhSachService,
        private hoSoGiamDinhService: HoSoGiamDinhService,
        private nhanVienService: NhanVienService,
        private loaiMauXetNghiemService: LoaiMauXetNghiemService,
        private haiCotLietSiService: HaiCotLietSiService,
        private hoSoThanNhanService: HoSoThanNhanService,
        private loaiThaoTacService: LoaiThaoTacService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ mauXetNghiem }) => {
            this.mauXetNghiem = mauXetNghiem;
            this.ngayLayMau = this.mauXetNghiem.ngayLayMau != null ? this.mauXetNghiem.ngayLayMau.format(DATE_TIME_FORMAT) : null;
            this.ngayTiepNhan = this.mauXetNghiem.ngayTiepNhan != null ? this.mauXetNghiem.ngayTiepNhan.format(DATE_TIME_FORMAT) : null;
        });
        this.tinhSachService.query().subscribe(
            (res: HttpResponse<ITinhSach[]>) => {
                this.tinhsaches = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.hoSoGiamDinhService.query().subscribe(
            (res: HttpResponse<IHoSoGiamDinh[]>) => {
                this.hosogiamdinhs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.nhanVienService.query().subscribe(
            (res: HttpResponse<INhanVien[]>) => {
                this.nhanviens = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.loaiMauXetNghiemService.query().subscribe(
            (res: HttpResponse<ILoaiMauXetNghiem[]>) => {
                this.loaimauxetnghiems = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.haiCotLietSiService.query().subscribe(
            (res: HttpResponse<IHaiCotLietSi[]>) => {
                this.haicotlietsis = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.hoSoThanNhanService.query().subscribe(
            (res: HttpResponse<IHoSoThanNhan[]>) => {
                this.hosothannhans = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.loaiThaoTacService.query().subscribe(
            (res: HttpResponse<ILoaiThaoTac[]>) => {
                this.loaithaotacs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.mauXetNghiem.ngayLayMau = this.ngayLayMau != null ? moment(this.ngayLayMau, DATE_TIME_FORMAT) : null;
        this.mauXetNghiem.ngayTiepNhan = this.ngayTiepNhan != null ? moment(this.ngayTiepNhan, DATE_TIME_FORMAT) : null;
        if (this.mauXetNghiem.id !== undefined) {
            this.subscribeToSaveResponse(this.mauXetNghiemService.update(this.mauXetNghiem));
        } else {
            this.subscribeToSaveResponse(this.mauXetNghiemService.create(this.mauXetNghiem));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IMauXetNghiem>>) {
        result.subscribe((res: HttpResponse<IMauXetNghiem>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackTinhSachById(index: number, item: ITinhSach) {
        return item.id;
    }

    trackHoSoGiamDinhById(index: number, item: IHoSoGiamDinh) {
        return item.id;
    }

    trackNhanVienById(index: number, item: INhanVien) {
        return item.id;
    }

    trackLoaiMauXetNghiemById(index: number, item: ILoaiMauXetNghiem) {
        return item.id;
    }

    trackHaiCotLietSiById(index: number, item: IHaiCotLietSi) {
        return item.id;
    }

    trackHoSoThanNhanById(index: number, item: IHoSoThanNhan) {
        return item.id;
    }

    trackLoaiThaoTacById(index: number, item: ILoaiThaoTac) {
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
