import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IHinhThaiHaiCot } from 'app/shared/model/hinh-thai-hai-cot.model';
import { HinhThaiHaiCotService } from './hinh-thai-hai-cot.service';
import { IHaiCotLietSi } from 'app/shared/model/hai-cot-liet-si.model';
import { HaiCotLietSiService } from 'app/entities/hai-cot-liet-si';
import { ILoaiHinhThaiHaiCot } from 'app/shared/model/loai-hinh-thai-hai-cot.model';
import { LoaiHinhThaiHaiCotService } from 'app/entities/loai-hinh-thai-hai-cot';

@Component({
    selector: 'jhi-hinh-thai-hai-cot-update',
    templateUrl: './hinh-thai-hai-cot-update.component.html'
})
export class HinhThaiHaiCotUpdateComponent implements OnInit {
    hinhThaiHaiCot: IHinhThaiHaiCot;
    isSaving: boolean;

    haicotlietsis: IHaiCotLietSi[];

    loaihinhthaihaicots: ILoaiHinhThaiHaiCot[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private hinhThaiHaiCotService: HinhThaiHaiCotService,
        private haiCotLietSiService: HaiCotLietSiService,
        private loaiHinhThaiHaiCotService: LoaiHinhThaiHaiCotService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ hinhThaiHaiCot }) => {
            this.hinhThaiHaiCot = hinhThaiHaiCot;
        });
        this.haiCotLietSiService.query().subscribe(
            (res: HttpResponse<IHaiCotLietSi[]>) => {
                this.haicotlietsis = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.loaiHinhThaiHaiCotService.query().subscribe(
            (res: HttpResponse<ILoaiHinhThaiHaiCot[]>) => {
                this.loaihinhthaihaicots = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.hinhThaiHaiCot.id !== undefined) {
            this.subscribeToSaveResponse(this.hinhThaiHaiCotService.update(this.hinhThaiHaiCot));
        } else {
            this.subscribeToSaveResponse(this.hinhThaiHaiCotService.create(this.hinhThaiHaiCot));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IHinhThaiHaiCot>>) {
        result.subscribe((res: HttpResponse<IHinhThaiHaiCot>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackHaiCotLietSiById(index: number, item: IHaiCotLietSi) {
        return item.id;
    }

    trackLoaiHinhThaiHaiCotById(index: number, item: ILoaiHinhThaiHaiCot) {
        return item.id;
    }
}
