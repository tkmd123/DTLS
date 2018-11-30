import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IPCRKetQua } from 'app/shared/model/pcr-ket-qua.model';
import { PCRKetQuaService } from './pcr-ket-qua.service';

@Component({
    selector: 'jhi-pcr-ket-qua-update',
    templateUrl: './pcr-ket-qua-update.component.html'
})
export class PCRKetQuaUpdateComponent implements OnInit {
    pCRKetQua: IPCRKetQua;
    isSaving: boolean;

    constructor(private pCRKetQuaService: PCRKetQuaService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ pCRKetQua }) => {
            this.pCRKetQua = pCRKetQua;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.pCRKetQua.id !== undefined) {
            this.subscribeToSaveResponse(this.pCRKetQuaService.update(this.pCRKetQua));
        } else {
            this.subscribeToSaveResponse(this.pCRKetQuaService.create(this.pCRKetQua));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPCRKetQua>>) {
        result.subscribe((res: HttpResponse<IPCRKetQua>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
