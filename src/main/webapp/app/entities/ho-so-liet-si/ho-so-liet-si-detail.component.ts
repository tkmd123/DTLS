import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHoSoLietSi } from 'app/shared/model/ho-so-liet-si.model';

@Component({
    selector: 'jhi-ho-so-liet-si-detail',
    templateUrl: './ho-so-liet-si-detail.component.html'
})
export class HoSoLietSiDetailComponent implements OnInit {
    hoSoLietSi: IHoSoLietSi;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ hoSoLietSi }) => {
            this.hoSoLietSi = hoSoLietSi;
        });
    }

    previousState() {
        window.history.back();
    }
}
