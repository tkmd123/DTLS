import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICapBac } from 'app/shared/model/cap-bac.model';
import { CapBacService } from './cap-bac.service';

@Component({
    selector: 'jhi-cap-bac-update',
    templateUrl: './cap-bac-update.component.html'
})
export class CapBacUpdateComponent implements OnInit {
    capBac: ICapBac;
    isSaving: boolean;

    constructor(private capBacService: CapBacService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ capBac }) => {
            this.capBac = capBac;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.capBac.id !== undefined) {
            this.subscribeToSaveResponse(this.capBacService.update(this.capBac));
        } else {
            this.subscribeToSaveResponse(this.capBacService.create(this.capBac));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICapBac>>) {
        result.subscribe((res: HttpResponse<ICapBac>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
