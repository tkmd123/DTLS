import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IHaiCotLietSi } from 'app/shared/model/hai-cot-liet-si.model';
import { HaiCotLietSiService } from './hai-cot-liet-si.service';
import { IHoSoLietSi } from 'app/shared/model/ho-so-liet-si.model';
import { HoSoLietSiService } from 'app/entities/ho-so-liet-si';
import { IThongTinKhaiQuat } from 'app/shared/model/thong-tin-khai-quat.model';
import { ThongTinKhaiQuatService } from 'app/entities/thong-tin-khai-quat';

@Component({
    selector: 'jhi-hai-cot-liet-si-update',
    templateUrl: './hai-cot-liet-si-update.component.html'
})
export class HaiCotLietSiUpdateComponent implements OnInit {
    haiCotLietSi: IHaiCotLietSi;
    isSaving: boolean;

    hosolietsis: IHoSoLietSi[];

    thongtinkhaiquats: IThongTinKhaiQuat[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private haiCotLietSiService: HaiCotLietSiService,
        private hoSoLietSiService: HoSoLietSiService,
        private thongTinKhaiQuatService: ThongTinKhaiQuatService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ haiCotLietSi }) => {
            this.haiCotLietSi = haiCotLietSi;
        });
        this.hoSoLietSiService.query().subscribe(
            (res: HttpResponse<IHoSoLietSi[]>) => {
                this.hosolietsis = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.thongTinKhaiQuatService.query().subscribe(
            (res: HttpResponse<IThongTinKhaiQuat[]>) => {
                this.thongtinkhaiquats = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.haiCotLietSi.id !== undefined) {
            this.subscribeToSaveResponse(this.haiCotLietSiService.update(this.haiCotLietSi));
        } else {
            this.subscribeToSaveResponse(this.haiCotLietSiService.create(this.haiCotLietSi));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IHaiCotLietSi>>) {
        result.subscribe((res: HttpResponse<IHaiCotLietSi>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackHoSoLietSiById(index: number, item: IHoSoLietSi) {
        return item.id;
    }

    trackThongTinKhaiQuatById(index: number, item: IThongTinKhaiQuat) {
        return item.id;
    }
}
