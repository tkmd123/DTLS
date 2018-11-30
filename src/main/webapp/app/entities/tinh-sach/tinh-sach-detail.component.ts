import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITinhSach } from 'app/shared/model/tinh-sach.model';

@Component({
    selector: 'jhi-tinh-sach-detail',
    templateUrl: './tinh-sach-detail.component.html'
})
export class TinhSachDetailComponent implements OnInit {
    tinhSach: ITinhSach;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tinhSach }) => {
            this.tinhSach = tinhSach;
        });
    }

    previousState() {
        window.history.back();
    }
}
