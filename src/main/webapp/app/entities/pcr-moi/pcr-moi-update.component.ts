import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IPCRMoi } from 'app/shared/model/pcr-moi.model';
import { PCRMoiService } from './pcr-moi.service';

@Component({
    selector: 'jhi-pcr-moi-update',
    templateUrl: './pcr-moi-update.component.html'
})
export class PCRMoiUpdateComponent implements OnInit {
    pCRMoi: IPCRMoi;
    isSaving: boolean;

    constructor(private pCRMoiService: PCRMoiService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ pCRMoi }) => {
            this.pCRMoi = pCRMoi;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.pCRMoi.id !== undefined) {
            this.subscribeToSaveResponse(this.pCRMoiService.update(this.pCRMoi));
        } else {
            this.subscribeToSaveResponse(this.pCRMoiService.create(this.pCRMoi));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPCRMoi>>) {
        result.subscribe((res: HttpResponse<IPCRMoi>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
