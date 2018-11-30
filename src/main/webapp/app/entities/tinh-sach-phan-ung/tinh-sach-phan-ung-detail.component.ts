import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITinhSachPhanUng } from 'app/shared/model/tinh-sach-phan-ung.model';

@Component({
    selector: 'jhi-tinh-sach-phan-ung-detail',
    templateUrl: './tinh-sach-phan-ung-detail.component.html'
})
export class TinhSachPhanUngDetailComponent implements OnInit {
    tinhSachPhanUng: ITinhSachPhanUng;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tinhSachPhanUng }) => {
            this.tinhSachPhanUng = tinhSachPhanUng;
        });
    }

    previousState() {
        window.history.back();
    }
}
