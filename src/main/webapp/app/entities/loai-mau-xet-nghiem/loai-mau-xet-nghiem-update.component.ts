import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ILoaiMauXetNghiem } from 'app/shared/model/loai-mau-xet-nghiem.model';
import { LoaiMauXetNghiemService } from './loai-mau-xet-nghiem.service';

@Component({
    selector: 'jhi-loai-mau-xet-nghiem-update',
    templateUrl: './loai-mau-xet-nghiem-update.component.html'
})
export class LoaiMauXetNghiemUpdateComponent implements OnInit {
    loaiMauXetNghiem: ILoaiMauXetNghiem;
    isSaving: boolean;

    constructor(private loaiMauXetNghiemService: LoaiMauXetNghiemService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ loaiMauXetNghiem }) => {
            this.loaiMauXetNghiem = loaiMauXetNghiem;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.loaiMauXetNghiem.id !== undefined) {
            this.subscribeToSaveResponse(this.loaiMauXetNghiemService.update(this.loaiMauXetNghiem));
        } else {
            this.subscribeToSaveResponse(this.loaiMauXetNghiemService.create(this.loaiMauXetNghiem));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ILoaiMauXetNghiem>>) {
        result.subscribe((res: HttpResponse<ILoaiMauXetNghiem>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
