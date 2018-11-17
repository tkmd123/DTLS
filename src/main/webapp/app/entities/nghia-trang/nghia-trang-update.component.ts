import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { INghiaTrang } from 'app/shared/model/nghia-trang.model';
import { NghiaTrangService } from './nghia-trang.service';
import { IPhuongXa } from 'app/shared/model/phuong-xa.model';
import { PhuongXaService } from 'app/entities/phuong-xa';

@Component({
    selector: 'jhi-nghia-trang-update',
    templateUrl: './nghia-trang-update.component.html'
})
export class NghiaTrangUpdateComponent implements OnInit {
    nghiaTrang: INghiaTrang;
    isSaving: boolean;

    phuongxas: IPhuongXa[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private nghiaTrangService: NghiaTrangService,
        private phuongXaService: PhuongXaService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ nghiaTrang }) => {
            this.nghiaTrang = nghiaTrang;
        });
        this.phuongXaService.query().subscribe(
            (res: HttpResponse<IPhuongXa[]>) => {
                this.phuongxas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.nghiaTrang.id !== undefined) {
            this.subscribeToSaveResponse(this.nghiaTrangService.update(this.nghiaTrang));
        } else {
            this.subscribeToSaveResponse(this.nghiaTrangService.create(this.nghiaTrang));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<INghiaTrang>>) {
        result.subscribe((res: HttpResponse<INghiaTrang>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPhuongXaById(index: number, item: IPhuongXa) {
        return item.id;
    }
}
