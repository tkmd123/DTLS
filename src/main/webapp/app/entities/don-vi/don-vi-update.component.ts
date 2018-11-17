import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IDonVi } from 'app/shared/model/don-vi.model';
import { DonViService } from './don-vi.service';

@Component({
    selector: 'jhi-don-vi-update',
    templateUrl: './don-vi-update.component.html'
})
export class DonViUpdateComponent implements OnInit {
    donVi: IDonVi;
    isSaving: boolean;

    donvis: IDonVi[];

    constructor(private jhiAlertService: JhiAlertService, private donViService: DonViService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ donVi }) => {
            this.donVi = donVi;
        });
        this.donViService.query().subscribe(
            (res: HttpResponse<IDonVi[]>) => {
                this.donvis = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.donVi.id !== undefined) {
            this.subscribeToSaveResponse(this.donViService.update(this.donVi));
        } else {
            this.subscribeToSaveResponse(this.donViService.create(this.donVi));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDonVi>>) {
        result.subscribe((res: HttpResponse<IDonVi>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackDonViById(index: number, item: IDonVi) {
        return item.id;
    }
}
