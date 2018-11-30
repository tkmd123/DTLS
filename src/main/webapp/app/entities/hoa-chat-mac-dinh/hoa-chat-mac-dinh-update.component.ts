import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IHoaChatMacDinh } from 'app/shared/model/hoa-chat-mac-dinh.model';
import { HoaChatMacDinhService } from './hoa-chat-mac-dinh.service';

@Component({
    selector: 'jhi-hoa-chat-mac-dinh-update',
    templateUrl: './hoa-chat-mac-dinh-update.component.html'
})
export class HoaChatMacDinhUpdateComponent implements OnInit {
    hoaChatMacDinh: IHoaChatMacDinh;
    isSaving: boolean;

    constructor(private hoaChatMacDinhService: HoaChatMacDinhService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ hoaChatMacDinh }) => {
            this.hoaChatMacDinh = hoaChatMacDinh;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.hoaChatMacDinh.id !== undefined) {
            this.subscribeToSaveResponse(this.hoaChatMacDinhService.update(this.hoaChatMacDinh));
        } else {
            this.subscribeToSaveResponse(this.hoaChatMacDinhService.create(this.hoaChatMacDinh));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IHoaChatMacDinh>>) {
        result.subscribe((res: HttpResponse<IHoaChatMacDinh>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
