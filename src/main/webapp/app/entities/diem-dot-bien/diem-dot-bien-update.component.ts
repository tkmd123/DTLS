import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IDiemDotBien } from 'app/shared/model/diem-dot-bien.model';
import { DiemDotBienService } from './diem-dot-bien.service';
import { IVungADN } from 'app/shared/model/vung-adn.model';
import { VungADNService } from 'app/entities/vung-adn';
import { IThongTinADN } from 'app/shared/model/thong-tin-adn.model';
import { ThongTinADNService } from 'app/entities/thong-tin-adn';

@Component({
    selector: 'jhi-diem-dot-bien-update',
    templateUrl: './diem-dot-bien-update.component.html'
})
export class DiemDotBienUpdateComponent implements OnInit {
    diemDotBien: IDiemDotBien;
    isSaving: boolean;

    vungadns: IVungADN[];

    thongtinadns: IThongTinADN[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private diemDotBienService: DiemDotBienService,
        private vungADNService: VungADNService,
        private thongTinADNService: ThongTinADNService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ diemDotBien }) => {
            this.diemDotBien = diemDotBien;
        });
        this.vungADNService.query().subscribe(
            (res: HttpResponse<IVungADN[]>) => {
                this.vungadns = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.thongTinADNService.query().subscribe(
            (res: HttpResponse<IThongTinADN[]>) => {
                this.thongtinadns = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.diemDotBien.id !== undefined) {
            this.subscribeToSaveResponse(this.diemDotBienService.update(this.diemDotBien));
        } else {
            this.subscribeToSaveResponse(this.diemDotBienService.create(this.diemDotBien));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDiemDotBien>>) {
        result.subscribe((res: HttpResponse<IDiemDotBien>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackVungADNById(index: number, item: IVungADN) {
        return item.id;
    }

    trackThongTinADNById(index: number, item: IThongTinADN) {
        return item.id;
    }
}
