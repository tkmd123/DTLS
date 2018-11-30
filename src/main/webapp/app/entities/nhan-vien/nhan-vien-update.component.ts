import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { INhanVien } from 'app/shared/model/nhan-vien.model';
import { NhanVienService } from './nhan-vien.service';
import { IUser, UserService } from 'app/core';
import { IPhongBan } from 'app/shared/model/phong-ban.model';
import { PhongBanService } from 'app/entities/phong-ban';

@Component({
    selector: 'jhi-nhan-vien-update',
    templateUrl: './nhan-vien-update.component.html'
})
export class NhanVienUpdateComponent implements OnInit {
    nhanVien: INhanVien;
    isSaving: boolean;

    users: IUser[];

    phongbans: IPhongBan[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private nhanVienService: NhanVienService,
        private userService: UserService,
        private phongBanService: PhongBanService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ nhanVien }) => {
            this.nhanVien = nhanVien;
        });
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.phongBanService.query().subscribe(
            (res: HttpResponse<IPhongBan[]>) => {
                this.phongbans = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.nhanVien.id !== undefined) {
            this.subscribeToSaveResponse(this.nhanVienService.update(this.nhanVien));
        } else {
            this.subscribeToSaveResponse(this.nhanVienService.create(this.nhanVien));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<INhanVien>>) {
        result.subscribe((res: HttpResponse<INhanVien>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackUserById(index: number, item: IUser) {
        return item.id;
    }

    trackPhongBanById(index: number, item: IPhongBan) {
        return item.id;
    }
}
