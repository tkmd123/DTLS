import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPhongBan } from 'app/shared/model/phong-ban.model';
import { PhongBanService } from './phong-ban.service';
import { ITrungTam } from 'app/shared/model/trung-tam.model';
import { TrungTamService } from 'app/entities/trung-tam';

@Component({
    selector: 'jhi-phong-ban-update',
    templateUrl: './phong-ban-update.component.html'
})
export class PhongBanUpdateComponent implements OnInit {
    phongBan: IPhongBan;
    isSaving: boolean;

    trungtams: ITrungTam[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private phongBanService: PhongBanService,
        private trungTamService: TrungTamService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ phongBan }) => {
            this.phongBan = phongBan;
        });
        this.trungTamService.query().subscribe(
            (res: HttpResponse<ITrungTam[]>) => {
                this.trungtams = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.phongBan.id !== undefined) {
            this.subscribeToSaveResponse(this.phongBanService.update(this.phongBan));
        } else {
            this.subscribeToSaveResponse(this.phongBanService.create(this.phongBan));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPhongBan>>) {
        result.subscribe((res: HttpResponse<IPhongBan>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackTrungTamById(index: number, item: ITrungTam) {
        return item.id;
    }
}
