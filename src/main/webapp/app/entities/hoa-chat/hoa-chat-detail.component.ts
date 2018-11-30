import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHoaChat } from 'app/shared/model/hoa-chat.model';

@Component({
    selector: 'jhi-hoa-chat-detail',
    templateUrl: './hoa-chat-detail.component.html'
})
export class HoaChatDetailComponent implements OnInit {
    hoaChat: IHoaChat;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ hoaChat }) => {
            this.hoaChat = hoaChat;
        });
    }

    previousState() {
        window.history.back();
    }
}
