import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IDonViThoiKy } from 'app/shared/model/don-vi-thoi-ky.model';
import { DonViThoiKyService } from './don-vi-thoi-ky.service';
import { IDonVi } from 'app/shared/model/don-vi.model';
import { DonViService } from 'app/entities/don-vi';

@Component({
    selector: 'jhi-don-vi-thoi-ky-update',
    templateUrl: './don-vi-thoi-ky-update.component.html'
})
export class DonViThoiKyUpdateComponent implements OnInit {
    donViThoiKy: IDonViThoiKy;
    isSaving: boolean;

    donvis: IDonVi[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private donViThoiKyService: DonViThoiKyService,
        private donViService: DonViService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ donViThoiKy }) => {
            this.donViThoiKy = donViThoiKy;
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
        if (this.donViThoiKy.id !== undefined) {
            this.subscribeToSaveResponse(this.donViThoiKyService.update(this.donViThoiKy));
        } else {
            this.subscribeToSaveResponse(this.donViThoiKyService.create(this.donViThoiKy));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDonViThoiKy>>) {
        result.subscribe((res: HttpResponse<IDonViThoiKy>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
