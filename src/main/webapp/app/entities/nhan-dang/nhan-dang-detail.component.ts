import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INhanDang } from 'app/shared/model/nhan-dang.model';

@Component({
    selector: 'jhi-nhan-dang-detail',
    templateUrl: './nhan-dang-detail.component.html'
})
export class NhanDangDetailComponent implements OnInit {
    nhanDang: INhanDang;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ nhanDang }) => {
            this.nhanDang = nhanDang;
        });
    }

    previousState() {
        window.history.back();
    }
}
