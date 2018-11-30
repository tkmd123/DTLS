import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IHoaChat } from 'app/shared/model/hoa-chat.model';
import { HoaChatService } from './hoa-chat.service';

@Component({
    selector: 'jhi-hoa-chat-update',
    templateUrl: './hoa-chat-update.component.html'
})
export class HoaChatUpdateComponent implements OnInit {
    hoaChat: IHoaChat;
    isSaving: boolean;

    constructor(private hoaChatService: HoaChatService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ hoaChat }) => {
            this.hoaChat = hoaChat;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.hoaChat.id !== undefined) {
            this.subscribeToSaveResponse(this.hoaChatService.update(this.hoaChat));
        } else {
            this.subscribeToSaveResponse(this.hoaChatService.create(this.hoaChat));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IHoaChat>>) {
        result.subscribe((res: HttpResponse<IHoaChat>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
