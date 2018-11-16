import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITinhThanh } from 'app/shared/model/tinh-thanh.model';

@Component({
    selector: 'jhi-tinh-thanh-detail',
    templateUrl: './tinh-thanh-detail.component.html'
})
export class TinhThanhDetailComponent implements OnInit {
    tinhThanh: ITinhThanh;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tinhThanh }) => {
            this.tinhThanh = tinhThanh;
        });
    }

    previousState() {
        window.history.back();
    }
}
