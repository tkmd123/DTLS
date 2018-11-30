import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IHoaChatTachChiet } from 'app/shared/model/hoa-chat-tach-chiet.model';
import { HoaChatTachChietService } from './hoa-chat-tach-chiet.service';
import { IHoaChat } from 'app/shared/model/hoa-chat.model';
import { HoaChatService } from 'app/entities/hoa-chat';
import { ITachChiet } from 'app/shared/model/tach-chiet.model';
import { TachChietService } from 'app/entities/tach-chiet';

@Component({
    selector: 'jhi-hoa-chat-tach-chiet-update',
    templateUrl: './hoa-chat-tach-chiet-update.component.html'
})
export class HoaChatTachChietUpdateComponent implements OnInit {
    hoaChatTachChiet: IHoaChatTachChiet;
    isSaving: boolean;

    hoachats: IHoaChat[];

    tachchiets: ITachChiet[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private hoaChatTachChietService: HoaChatTachChietService,
        private hoaChatService: HoaChatService,
        private tachChietService: TachChietService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ hoaChatTachChiet }) => {
            this.hoaChatTachChiet = hoaChatTachChiet;
        });
        this.hoaChatService.query().subscribe(
            (res: HttpResponse<IHoaChat[]>) => {
                this.hoachats = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.tachChietService.query().subscribe(
            (res: HttpResponse<ITachChiet[]>) => {
                this.tachchiets = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.hoaChatTachChiet.id !== undefined) {
            this.subscribeToSaveResponse(this.hoaChatTachChietService.update(this.hoaChatTachChiet));
        } else {
            this.subscribeToSaveResponse(this.hoaChatTachChietService.create(this.hoaChatTachChiet));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IHoaChatTachChiet>>) {
        result.subscribe((res: HttpResponse<IHoaChatTachChiet>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackHoaChatById(index: number, item: IHoaChat) {
        return item.id;
    }

    trackTachChietById(index: number, item: ITachChiet) {
        return item.id;
    }
}
