import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHoSoGiamDinh } from 'app/shared/model/ho-so-giam-dinh.model';

@Component({
    selector: 'jhi-ho-so-giam-dinh-detail',
    templateUrl: './ho-so-giam-dinh-detail.component.html'
})
export class HoSoGiamDinhDetailComponent implements OnInit {
    hoSoGiamDinh: IHoSoGiamDinh;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ hoSoGiamDinh }) => {
            this.hoSoGiamDinh = hoSoGiamDinh;
        });
    }

    previousState() {
        window.history.back();
    }
}
