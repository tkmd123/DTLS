import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ILoaiThaoTac } from 'app/shared/model/loai-thao-tac.model';
import { LoaiThaoTacService } from './loai-thao-tac.service';
import { IPhongBan } from 'app/shared/model/phong-ban.model';
import { PhongBanService } from 'app/entities/phong-ban';

@Component({
    selector: 'jhi-loai-thao-tac-update',
    templateUrl: './loai-thao-tac-update.component.html'
})
export class LoaiThaoTacUpdateComponent implements OnInit {
    loaiThaoTac: ILoaiThaoTac;
    isSaving: boolean;

    loaithaotacs: ILoaiThaoTac[];

    phongbans: IPhongBan[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private loaiThaoTacService: LoaiThaoTacService,
        private phongBanService: PhongBanService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ loaiThaoTac }) => {
            this.loaiThaoTac = loaiThaoTac;
        });
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
        if (this.loaiThaoTac.id !== undefined) {
            this.subscribeToSaveResponse(this.loaiThaoTacService.update(this.loaiThaoTac));
        } else {
            this.subscribeToSaveResponse(this.loaiThaoTacService.create(this.loaiThaoTac));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ILoaiThaoTac>>) {
        result.subscribe((res: HttpResponse<ILoaiThaoTac>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackLoaiThaoTacById(index: number, item: ILoaiThaoTac) {
        return item.id;
    }

    trackPhongBanById(index: number, item: IPhongBan) {
        return item.id;
    }
}
