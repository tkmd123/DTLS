import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPCRMau } from 'app/shared/model/pcr-mau.model';
import { PCRMauService } from './pcr-mau.service';
import { IPCRKetQua } from 'app/shared/model/pcr-ket-qua.model';
import { PCRKetQuaService } from 'app/entities/pcr-ket-qua';
import { IPCR } from 'app/shared/model/pcr.model';
import { PCRService } from 'app/entities/pcr';
import { IMauXetNghiem } from 'app/shared/model/mau-xet-nghiem.model';
import { MauXetNghiemService } from 'app/entities/mau-xet-nghiem';
import { IPCRMoi } from 'app/shared/model/pcr-moi.model';
import { PCRMoiService } from 'app/entities/pcr-moi';

@Component({
    selector: 'jhi-pcr-mau-update',
    templateUrl: './pcr-mau-update.component.html'
})
export class PCRMauUpdateComponent implements OnInit {
    pCRMau: IPCRMau;
    isSaving: boolean;

    pcrketquas: IPCRKetQua[];

    pcrs: IPCR[];

    mauxetnghiems: IMauXetNghiem[];

    pcrmois: IPCRMoi[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private pCRMauService: PCRMauService,
        private pCRKetQuaService: PCRKetQuaService,
        private pCRService: PCRService,
        private mauXetNghiemService: MauXetNghiemService,
        private pCRMoiService: PCRMoiService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ pCRMau }) => {
            this.pCRMau = pCRMau;
        });
        this.pCRKetQuaService.query().subscribe(
            (res: HttpResponse<IPCRKetQua[]>) => {
                this.pcrketquas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.pCRService.query().subscribe(
            (res: HttpResponse<IPCR[]>) => {
                this.pcrs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.mauXetNghiemService.query().subscribe(
            (res: HttpResponse<IMauXetNghiem[]>) => {
                this.mauxetnghiems = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.pCRMoiService.query().subscribe(
            (res: HttpResponse<IPCRMoi[]>) => {
                this.pcrmois = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.pCRMau.id !== undefined) {
            this.subscribeToSaveResponse(this.pCRMauService.update(this.pCRMau));
        } else {
            this.subscribeToSaveResponse(this.pCRMauService.create(this.pCRMau));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPCRMau>>) {
        result.subscribe((res: HttpResponse<IPCRMau>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPCRKetQuaById(index: number, item: IPCRKetQua) {
        return item.id;
    }

    trackPCRById(index: number, item: IPCR) {
        return item.id;
    }

    trackMauXetNghiemById(index: number, item: IMauXetNghiem) {
        return item.id;
    }

    trackPCRMoiById(index: number, item: IPCRMoi) {
        return item.id;
    }
}
