import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { INhanDang } from 'app/shared/model/nhan-dang.model';
import { NhanDangService } from './nhan-dang.service';

@Component({
    selector: 'jhi-nhan-dang-update',
    templateUrl: './nhan-dang-update.component.html'
})
export class NhanDangUpdateComponent implements OnInit {
    nhanDang: INhanDang;
    isSaving: boolean;

    constructor(private nhanDangService: NhanDangService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ nhanDang }) => {
            this.nhanDang = nhanDang;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.nhanDang.id !== undefined) {
            this.subscribeToSaveResponse(this.nhanDangService.update(this.nhanDang));
        } else {
            this.subscribeToSaveResponse(this.nhanDangService.create(this.nhanDang));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<INhanDang>>) {
        result.subscribe((res: HttpResponse<INhanDang>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
