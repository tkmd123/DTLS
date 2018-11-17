import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPhuongXa } from 'app/shared/model/phuong-xa.model';

@Component({
    selector: 'jhi-phuong-xa-detail',
    templateUrl: './phuong-xa-detail.component.html'
})
export class PhuongXaDetailComponent implements OnInit {
    phuongXa: IPhuongXa;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ phuongXa }) => {
            this.phuongXa = phuongXa;
        });
    }

    previousState() {
        window.history.back();
    }
}
