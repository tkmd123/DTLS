import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ILoaiHinhThaiHaiCot } from 'app/shared/model/loai-hinh-thai-hai-cot.model';
import { LoaiHinhThaiHaiCotService } from './loai-hinh-thai-hai-cot.service';

@Component({
    selector: 'jhi-loai-hinh-thai-hai-cot-update',
    templateUrl: './loai-hinh-thai-hai-cot-update.component.html'
})
export class LoaiHinhThaiHaiCotUpdateComponent implements OnInit {
    loaiHinhThaiHaiCot: ILoaiHinhThaiHaiCot;
    isSaving: boolean;

    constructor(private loaiHinhThaiHaiCotService: LoaiHinhThaiHaiCotService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ loaiHinhThaiHaiCot }) => {
            this.loaiHinhThaiHaiCot = loaiHinhThaiHaiCot;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.loaiHinhThaiHaiCot.id !== undefined) {
            this.subscribeToSaveResponse(this.loaiHinhThaiHaiCotService.update(this.loaiHinhThaiHaiCot));
        } else {
            this.subscribeToSaveResponse(this.loaiHinhThaiHaiCotService.create(this.loaiHinhThaiHaiCot));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ILoaiHinhThaiHaiCot>>) {
        result.subscribe((res: HttpResponse<ILoaiHinhThaiHaiCot>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
