import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IMauTachChiet } from 'app/shared/model/mau-tach-chiet.model';
import { MauTachChietService } from './mau-tach-chiet.service';
import { IMauXetNghiem } from 'app/shared/model/mau-xet-nghiem.model';
import { MauXetNghiemService } from 'app/entities/mau-xet-nghiem';
import { ITachChiet } from 'app/shared/model/tach-chiet.model';
import { TachChietService } from 'app/entities/tach-chiet';

@Component({
    selector: 'jhi-mau-tach-chiet-update',
    templateUrl: './mau-tach-chiet-update.component.html'
})
export class MauTachChietUpdateComponent implements OnInit {
    mauTachChiet: IMauTachChiet;
    isSaving: boolean;

    mauxetnghiems: IMauXetNghiem[];

    tachchiets: ITachChiet[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private mauTachChietService: MauTachChietService,
        private mauXetNghiemService: MauXetNghiemService,
        private tachChietService: TachChietService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ mauTachChiet }) => {
            this.mauTachChiet = mauTachChiet;
        });
        this.mauXetNghiemService.query().subscribe(
            (res: HttpResponse<IMauXetNghiem[]>) => {
                this.mauxetnghiems = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.tachChietService.query().subscribe(
            (res: HttpResponse<ITachChiet[]>) => {
                this.tachchiets = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.mauTachChiet.id !== undefined) {
            this.subscribeToSaveResponse(this.mauTachChietService.update(this.mauTachChiet));
        } else {
            this.subscribeToSaveResponse(this.mauTachChietService.create(this.mauTachChiet));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IMauTachChiet>>) {
        result.subscribe((res: HttpResponse<IMauTachChiet>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackTachChietById(index: number, item: ITachChiet) {
        return item.id;
    }
}
