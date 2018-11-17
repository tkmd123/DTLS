import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IPhongBan } from 'app/shared/model/phong-ban.model';
import { PhongBanService } from './phong-ban.service';

@Component({
    selector: 'jhi-phong-ban-update',
    templateUrl: './phong-ban-update.component.html'
})
export class PhongBanUpdateComponent implements OnInit {
    phongBan: IPhongBan;
    isSaving: boolean;

    constructor(private phongBanService: PhongBanService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ phongBan }) => {
            this.phongBan = phongBan;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.phongBan.id !== undefined) {
            this.subscribeToSaveResponse(this.phongBanService.update(this.phongBan));
        } else {
            this.subscribeToSaveResponse(this.phongBanService.create(this.phongBan));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPhongBan>>) {
        result.subscribe((res: HttpResponse<IPhongBan>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
