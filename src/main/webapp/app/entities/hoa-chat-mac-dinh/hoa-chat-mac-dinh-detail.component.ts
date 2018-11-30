import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHoaChatMacDinh } from 'app/shared/model/hoa-chat-mac-dinh.model';

@Component({
    selector: 'jhi-hoa-chat-mac-dinh-detail',
    templateUrl: './hoa-chat-mac-dinh-detail.component.html'
})
export class HoaChatMacDinhDetailComponent implements OnInit {
    hoaChatMacDinh: IHoaChatMacDinh;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ hoaChatMacDinh }) => {
            this.hoaChatMacDinh = hoaChatMacDinh;
        });
    }

    previousState() {
        window.history.back();
    }
}
