import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ITinhThanh } from 'app/shared/model/tinh-thanh.model';
import { TinhThanhService } from './tinh-thanh.service';

@Component({
    selector: 'jhi-tinh-thanh-update',
    templateUrl: './tinh-thanh-update.component.html'
})
export class TinhThanhUpdateComponent implements OnInit {
    tinhThanh: ITinhThanh;
    isSaving: boolean;

    constructor(private tinhThanhService: TinhThanhService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ tinhThanh }) => {
            this.tinhThanh = tinhThanh;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.tinhThanh.id !== undefined) {
            this.subscribeToSaveResponse(this.tinhThanhService.update(this.tinhThanh));
        } else {
            this.subscribeToSaveResponse(this.tinhThanhService.create(this.tinhThanh));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITinhThanh>>) {
        result.subscribe((res: HttpResponse<ITinhThanh>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
