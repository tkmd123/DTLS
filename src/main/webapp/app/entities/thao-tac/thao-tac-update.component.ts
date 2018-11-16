import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IThaoTac } from 'app/shared/model/thao-tac.model';
import { ThaoTacService } from './thao-tac.service';
import { IMauXetNghiem } from 'app/shared/model/mau-xet-nghiem.model';
import { MauXetNghiemService } from 'app/entities/mau-xet-nghiem';
import { ILoaiThaoTac } from 'app/shared/model/loai-thao-tac.model';
import { LoaiThaoTacService } from 'app/entities/loai-thao-tac';
import { IPhongBan } from 'app/shared/model/phong-ban.model';
import { PhongBanService } from 'app/entities/phong-ban';

@Component({
    selector: 'jhi-thao-tac-update',
    templateUrl: './thao-tac-update.component.html'
})
export class ThaoTacUpdateComponent implements OnInit {
    thaoTac: IThaoTac;
    isSaving: boolean;

    mauxetnghiems: IMauXetNghiem[];

    loaithaotacs: ILoaiThaoTac[];

    phongbans: IPhongBan[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private thaoTacService: ThaoTacService,
        private mauXetNghiemService: MauXetNghiemService,
        private loaiThaoTacService: LoaiThaoTacService,
        private phongBanService: PhongBanService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ thaoTac }) => {
            this.thaoTac = thaoTac;
        });
        this.mauXetNghiemService.query().subscribe(
            (res: HttpResponse<IMauXetNghiem[]>) => {
                this.mauxetnghiems = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.loaiThaoTacService.query().subscribe(
            (res: HttpResponse<ILoaiThaoTac[]>) => {
                this.loaithaotacs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.phongBanService.query().subscribe(
            (res: HttpResponse<IPhongBan[]>) => {
                this.phongbans = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.thaoTac.id !== undefined) {
            this.subscribeToSaveResponse(this.thaoTacService.update(this.thaoTac));
        } else {
            this.subscribeToSaveResponse(this.thaoTacService.create(this.thaoTac));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IThaoTac>>) {
        result.subscribe((res: HttpResponse<IThaoTac>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackMauXetNghiemById(index: number, item: IMauXetNghiem) {
        return item.id;
    }

    trackLoaiThaoTacById(index: number, item: ILoaiThaoTac) {
        return item.id;
    }

    trackPhongBanById(index: number, item: IPhongBan) {
        return item.id;
    }
}
