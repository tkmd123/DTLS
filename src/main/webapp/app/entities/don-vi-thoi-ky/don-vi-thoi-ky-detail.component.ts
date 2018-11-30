import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDonViThoiKy } from 'app/shared/model/don-vi-thoi-ky.model';

@Component({
    selector: 'jhi-don-vi-thoi-ky-detail',
    templateUrl: './don-vi-thoi-ky-detail.component.html'
})
export class DonViThoiKyDetailComponent implements OnInit {
    donViThoiKy: IDonViThoiKy;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ donViThoiKy }) => {
            this.donViThoiKy = donViThoiKy;
        });
    }

    previousState() {
        window.history.back();
    }
}
