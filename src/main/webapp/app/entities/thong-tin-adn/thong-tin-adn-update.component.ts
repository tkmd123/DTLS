import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IThongTinADN } from 'app/shared/model/thong-tin-adn.model';
import { ThongTinADNService } from './thong-tin-adn.service';

@Component({
    selector: 'jhi-thong-tin-adn-update',
    templateUrl: './thong-tin-adn-update.component.html'
})
export class ThongTinADNUpdateComponent implements OnInit {
    thongTinADN: IThongTinADN;
    isSaving: boolean;

    constructor(private thongTinADNService: ThongTinADNService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ thongTinADN }) => {
            this.thongTinADN = thongTinADN;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.thongTinADN.id !== undefined) {
            this.subscribeToSaveResponse(this.thongTinADNService.update(this.thongTinADN));
        } else {
            this.subscribeToSaveResponse(this.thongTinADNService.create(this.thongTinADN));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IThongTinADN>>) {
        result.subscribe((res: HttpResponse<IThongTinADN>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
