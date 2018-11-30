import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPCRPhanUng } from 'app/shared/model/pcr-phan-ung.model';
import { PCRPhanUngService } from './pcr-phan-ung.service';
import { IPCR } from 'app/shared/model/pcr.model';
import { PCRService } from 'app/entities/pcr';
import { IHoaChat } from 'app/shared/model/hoa-chat.model';
import { HoaChatService } from 'app/entities/hoa-chat';

@Component({
    selector: 'jhi-pcr-phan-ung-update',
    templateUrl: './pcr-phan-ung-update.component.html'
})
export class PCRPhanUngUpdateComponent implements OnInit {
    pCRPhanUng: IPCRPhanUng;
    isSaving: boolean;

    pcrs: IPCR[];

    hoachats: IHoaChat[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private pCRPhanUngService: PCRPhanUngService,
        private pCRService: PCRService,
        private hoaChatService: HoaChatService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ pCRPhanUng }) => {
            this.pCRPhanUng = pCRPhanUng;
        });
        this.pCRService.query().subscribe(
            (res: HttpResponse<IPCR[]>) => {
                this.pcrs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.hoaChatService.query().subscribe(
            (res: HttpResponse<IHoaChat[]>) => {
                this.hoachats = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.pCRPhanUng.id !== undefined) {
            this.subscribeToSaveResponse(this.pCRPhanUngService.update(this.pCRPhanUng));
        } else {
            this.subscribeToSaveResponse(this.pCRPhanUngService.create(this.pCRPhanUng));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPCRPhanUng>>) {
        result.subscribe((res: HttpResponse<IPCRPhanUng>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPCRById(index: number, item: IPCR) {
        return item.id;
    }

    trackHoaChatById(index: number, item: IHoaChat) {
        return item.id;
    }
}
