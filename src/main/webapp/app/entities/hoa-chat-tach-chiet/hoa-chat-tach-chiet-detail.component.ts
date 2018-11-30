import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHoaChatTachChiet } from 'app/shared/model/hoa-chat-tach-chiet.model';

@Component({
    selector: 'jhi-hoa-chat-tach-chiet-detail',
    templateUrl: './hoa-chat-tach-chiet-detail.component.html'
})
export class HoaChatTachChietDetailComponent implements OnInit {
    hoaChatTachChiet: IHoaChatTachChiet;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ hoaChatTachChiet }) => {
            this.hoaChatTachChiet = hoaChatTachChiet;
        });
    }

    previousState() {
        window.history.back();
    }
}
