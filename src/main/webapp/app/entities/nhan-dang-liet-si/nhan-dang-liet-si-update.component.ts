import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { INhanDangLietSi } from 'app/shared/model/nhan-dang-liet-si.model';
import { NhanDangLietSiService } from './nhan-dang-liet-si.service';
import { INhanDang } from 'app/shared/model/nhan-dang.model';
import { NhanDangService } from 'app/entities/nhan-dang';
import { IHoSoLietSi } from 'app/shared/model/ho-so-liet-si.model';
import { HoSoLietSiService } from 'app/entities/ho-so-liet-si';

@Component({
    selector: 'jhi-nhan-dang-liet-si-update',
    templateUrl: './nhan-dang-liet-si-update.component.html'
})
export class NhanDangLietSiUpdateComponent implements OnInit {
    nhanDangLietSi: INhanDangLietSi;
    isSaving: boolean;

    nhandangs: INhanDang[];

    hosolietsis: IHoSoLietSi[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private nhanDangLietSiService: NhanDangLietSiService,
        private nhanDangService: NhanDangService,
        private hoSoLietSiService: HoSoLietSiService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ nhanDangLietSi }) => {
            this.nhanDangLietSi = nhanDangLietSi;
        });
        this.nhanDangService.query().subscribe(
            (res: HttpResponse<INhanDang[]>) => {
                this.nhandangs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.hoSoLietSiService.query().subscribe(
            (res: HttpResponse<IHoSoLietSi[]>) => {
                this.hosolietsis = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.nhanDangLietSi.id !== undefined) {
            this.subscribeToSaveResponse(this.nhanDangLietSiService.update(this.nhanDangLietSi));
        } else {
            this.subscribeToSaveResponse(this.nhanDangLietSiService.create(this.nhanDangLietSi));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<INhanDangLietSi>>) {
        result.subscribe((res: HttpResponse<INhanDangLietSi>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackNhanDangById(index: number, item: INhanDang) {
        return item.id;
    }

    trackHoSoLietSiById(index: number, item: IHoSoLietSi) {
        return item.id;
    }
}
