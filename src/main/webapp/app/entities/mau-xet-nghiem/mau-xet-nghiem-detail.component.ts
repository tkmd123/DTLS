import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMauXetNghiem } from 'app/shared/model/mau-xet-nghiem.model';

@Component({
    selector: 'jhi-mau-xet-nghiem-detail',
    templateUrl: './mau-xet-nghiem-detail.component.html'
})
export class MauXetNghiemDetailComponent implements OnInit {
    mauXetNghiem: IMauXetNghiem;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ mauXetNghiem }) => {
            this.mauXetNghiem = mauXetNghiem;
        });
    }

    previousState() {
        window.history.back();
    }
}
