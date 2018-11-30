import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IChucVu } from 'app/shared/model/chuc-vu.model';
import { ChucVuService } from './chuc-vu.service';

@Component({
    selector: 'jhi-chuc-vu-update',
    templateUrl: './chuc-vu-update.component.html'
})
export class ChucVuUpdateComponent implements OnInit {
    chucVu: IChucVu;
    isSaving: boolean;

    constructor(private chucVuService: ChucVuService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ chucVu }) => {
            this.chucVu = chucVu;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.chucVu.id !== undefined) {
            this.subscribeToSaveResponse(this.chucVuService.update(this.chucVu));
        } else {
            this.subscribeToSaveResponse(this.chucVuService.create(this.chucVu));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IChucVu>>) {
        result.subscribe((res: HttpResponse<IChucVu>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
