import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IThanNhanLietSi } from 'app/shared/model/than-nhan-liet-si.model';
import { ThanNhanLietSiService } from './than-nhan-liet-si.service';
import { IHoSoLietSi } from 'app/shared/model/ho-so-liet-si.model';
import { HoSoLietSiService } from 'app/entities/ho-so-liet-si';
import { IQuanHeThanNhan } from 'app/shared/model/quan-he-than-nhan.model';
import { QuanHeThanNhanService } from 'app/entities/quan-he-than-nhan';
import { IHoSoThanNhan } from 'app/shared/model/ho-so-than-nhan.model';
import { HoSoThanNhanService } from 'app/entities/ho-so-than-nhan';

@Component({
    selector: 'jhi-than-nhan-liet-si-update',
    templateUrl: './than-nhan-liet-si-update.component.html'
})
export class ThanNhanLietSiUpdateComponent implements OnInit {
    thanNhanLietSi: IThanNhanLietSi;
    isSaving: boolean;

    hosolietsis: IHoSoLietSi[];

    quanhethannhans: IQuanHeThanNhan[];

    hosothannhans: IHoSoThanNhan[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private thanNhanLietSiService: ThanNhanLietSiService,
        private hoSoLietSiService: HoSoLietSiService,
        private quanHeThanNhanService: QuanHeThanNhanService,
        private hoSoThanNhanService: HoSoThanNhanService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ thanNhanLietSi }) => {
            this.thanNhanLietSi = thanNhanLietSi;
        });
        this.hoSoLietSiService.query().subscribe(
            (res: HttpResponse<IHoSoLietSi[]>) => {
                this.hosolietsis = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.quanHeThanNhanService.query().subscribe(
            (res: HttpResponse<IQuanHeThanNhan[]>) => {
                this.quanhethannhans = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.hoSoThanNhanService.query().subscribe(
            (res: HttpResponse<IHoSoThanNhan[]>) => {
                this.hosothannhans = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.thanNhanLietSi.id !== undefined) {
            this.subscribeToSaveResponse(this.thanNhanLietSiService.update(this.thanNhanLietSi));
        } else {
            this.subscribeToSaveResponse(this.thanNhanLietSiService.create(this.thanNhanLietSi));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IThanNhanLietSi>>) {
        result.subscribe((res: HttpResponse<IThanNhanLietSi>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackQuanHeThanNhanById(index: number, item: IQuanHeThanNhan) {
        return item.id;
    }

    trackHoSoThanNhanById(index: number, item: IHoSoThanNhan) {
        return item.id;
    }
}
