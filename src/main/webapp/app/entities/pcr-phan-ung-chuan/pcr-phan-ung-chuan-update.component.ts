import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IPCRPhanUngChuan } from 'app/shared/model/pcr-phan-ung-chuan.model';
import { PCRPhanUngChuanService } from './pcr-phan-ung-chuan.service';

@Component({
    selector: 'jhi-pcr-phan-ung-chuan-update',
    templateUrl: './pcr-phan-ung-chuan-update.component.html'
})
export class PCRPhanUngChuanUpdateComponent implements OnInit {
    pCRPhanUngChuan: IPCRPhanUngChuan;
    isSaving: boolean;

    constructor(private pCRPhanUngChuanService: PCRPhanUngChuanService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ pCRPhanUngChuan }) => {
            this.pCRPhanUngChuan = pCRPhanUngChuan;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.pCRPhanUngChuan.id !== undefined) {
            this.subscribeToSaveResponse(this.pCRPhanUngChuanService.update(this.pCRPhanUngChuan));
        } else {
            this.subscribeToSaveResponse(this.pCRPhanUngChuanService.create(this.pCRPhanUngChuan));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPCRPhanUngChuan>>) {
        result.subscribe((res: HttpResponse<IPCRPhanUngChuan>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
