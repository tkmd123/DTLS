import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ITinhSachPhanUng } from 'app/shared/model/tinh-sach-phan-ung.model';
import { TinhSachPhanUngService } from './tinh-sach-phan-ung.service';
import { ITinhSach } from 'app/shared/model/tinh-sach.model';
import { TinhSachService } from 'app/entities/tinh-sach';
import { IHoaChat } from 'app/shared/model/hoa-chat.model';
import { HoaChatService } from 'app/entities/hoa-chat';

@Component({
    selector: 'jhi-tinh-sach-phan-ung-update',
    templateUrl: './tinh-sach-phan-ung-update.component.html'
})
export class TinhSachPhanUngUpdateComponent implements OnInit {
    tinhSachPhanUng: ITinhSachPhanUng;
    isSaving: boolean;

    tinhsaches: ITinhSach[];

    hoachats: IHoaChat[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private tinhSachPhanUngService: TinhSachPhanUngService,
        private tinhSachService: TinhSachService,
        private hoaChatService: HoaChatService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ tinhSachPhanUng }) => {
            this.tinhSachPhanUng = tinhSachPhanUng;
        });
        this.tinhSachService.query().subscribe(
            (res: HttpResponse<ITinhSach[]>) => {
                this.tinhsaches = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.hoaChatService.query().subscribe(
            (res: HttpResponse<IHoaChat[]>) => {
                this.hoachats = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.tinhSachPhanUng.id !== undefined) {
            this.subscribeToSaveResponse(this.tinhSachPhanUngService.update(this.tinhSachPhanUng));
        } else {
            this.subscribeToSaveResponse(this.tinhSachPhanUngService.create(this.tinhSachPhanUng));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITinhSachPhanUng>>) {
        result.subscribe((res: HttpResponse<ITinhSachPhanUng>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackHoaChatById(index: number, item: IHoaChat) {
        return item.id;
    }
}
