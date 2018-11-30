import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ITrungTam } from 'app/shared/model/trung-tam.model';
import { TrungTamService } from './trung-tam.service';

@Component({
    selector: 'jhi-trung-tam-update',
    templateUrl: './trung-tam-update.component.html'
})
export class TrungTamUpdateComponent implements OnInit {
    trungTam: ITrungTam;
    isSaving: boolean;

    constructor(private trungTamService: TrungTamService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ trungTam }) => {
            this.trungTam = trungTam;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.trungTam.id !== undefined) {
            this.subscribeToSaveResponse(this.trungTamService.update(this.trungTam));
        } else {
            this.subscribeToSaveResponse(this.trungTamService.create(this.trungTam));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITrungTam>>) {
        result.subscribe((res: HttpResponse<ITrungTam>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
