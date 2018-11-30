import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IMayPCR } from 'app/shared/model/may-pcr.model';
import { MayPCRService } from './may-pcr.service';

@Component({
    selector: 'jhi-may-pcr-update',
    templateUrl: './may-pcr-update.component.html'
})
export class MayPCRUpdateComponent implements OnInit {
    mayPCR: IMayPCR;
    isSaving: boolean;

    constructor(private mayPCRService: MayPCRService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ mayPCR }) => {
            this.mayPCR = mayPCR;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.mayPCR.id !== undefined) {
            this.subscribeToSaveResponse(this.mayPCRService.update(this.mayPCR));
        } else {
            this.subscribeToSaveResponse(this.mayPCRService.create(this.mayPCR));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IMayPCR>>) {
        result.subscribe((res: HttpResponse<IMayPCR>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
