import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IHoSoLietSi } from 'app/shared/model/ho-so-liet-si.model';
import { HoSoLietSiService } from './ho-so-liet-si.service';
import { IPhuongXa } from 'app/shared/model/phuong-xa.model';
import { PhuongXaService } from 'app/entities/phuong-xa';
import { ICapBac } from 'app/shared/model/cap-bac.model';
import { CapBacService } from 'app/entities/cap-bac';
import { IChucVu } from 'app/shared/model/chuc-vu.model';
import { ChucVuService } from 'app/entities/chuc-vu';
import { IDonVi } from 'app/shared/model/don-vi.model';
import { DonViService } from 'app/entities/don-vi';

@Component({
    selector: 'jhi-ho-so-liet-si-update',
    templateUrl: './ho-so-liet-si-update.component.html'
})
export class HoSoLietSiUpdateComponent implements OnInit {
    hoSoLietSi: IHoSoLietSi;
    isSaving: boolean;

    phuongxas: IPhuongXa[];

    capbacs: ICapBac[];

    chucvus: IChucVu[];

    donvis: IDonVi[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private hoSoLietSiService: HoSoLietSiService,
        private phuongXaService: PhuongXaService,
        private capBacService: CapBacService,
        private chucVuService: ChucVuService,
        private donViService: DonViService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ hoSoLietSi }) => {
            this.hoSoLietSi = hoSoLietSi;
        });
        this.phuongXaService.query().subscribe(
            (res: HttpResponse<IPhuongXa[]>) => {
                this.phuongxas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.capBacService.query().subscribe(
            (res: HttpResponse<ICapBac[]>) => {
                this.capbacs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.chucVuService.query().subscribe(
            (res: HttpResponse<IChucVu[]>) => {
                this.chucvus = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
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
        if (this.hoSoLietSi.id !== undefined) {
            this.subscribeToSaveResponse(this.hoSoLietSiService.update(this.hoSoLietSi));
        } else {
            this.subscribeToSaveResponse(this.hoSoLietSiService.create(this.hoSoLietSi));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IHoSoLietSi>>) {
        result.subscribe((res: HttpResponse<IHoSoLietSi>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackCapBacById(index: number, item: ICapBac) {
        return item.id;
    }

    trackChucVuById(index: number, item: IChucVu) {
        return item.id;
    }

    trackDonViById(index: number, item: IDonVi) {
        return item.id;
    }
}
