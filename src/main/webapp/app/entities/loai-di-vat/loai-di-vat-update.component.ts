import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ILoaiDiVat } from 'app/shared/model/loai-di-vat.model';
import { LoaiDiVatService } from './loai-di-vat.service';

@Component({
    selector: 'jhi-loai-di-vat-update',
    templateUrl: './loai-di-vat-update.component.html'
})
export class LoaiDiVatUpdateComponent implements OnInit {
    loaiDiVat: ILoaiDiVat;
    isSaving: boolean;

    constructor(private loaiDiVatService: LoaiDiVatService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ loaiDiVat }) => {
            this.loaiDiVat = loaiDiVat;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.loaiDiVat.id !== undefined) {
            this.subscribeToSaveResponse(this.loaiDiVatService.update(this.loaiDiVat));
        } else {
            this.subscribeToSaveResponse(this.loaiDiVatService.create(this.loaiDiVat));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ILoaiDiVat>>) {
        result.subscribe((res: HttpResponse<ILoaiDiVat>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
