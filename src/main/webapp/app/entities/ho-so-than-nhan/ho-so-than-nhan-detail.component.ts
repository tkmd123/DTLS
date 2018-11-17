import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHoSoThanNhan } from 'app/shared/model/ho-so-than-nhan.model';

@Component({
    selector: 'jhi-ho-so-than-nhan-detail',
    templateUrl: './ho-so-than-nhan-detail.component.html'
})
export class HoSoThanNhanDetailComponent implements OnInit {
    hoSoThanNhan: IHoSoThanNhan;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ hoSoThanNhan }) => {
            this.hoSoThanNhan = hoSoThanNhan;
        });
    }

    previousState() {
        window.history.back();
    }
}
