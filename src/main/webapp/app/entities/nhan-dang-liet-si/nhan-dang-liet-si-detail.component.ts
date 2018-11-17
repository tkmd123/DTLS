import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INhanDangLietSi } from 'app/shared/model/nhan-dang-liet-si.model';

@Component({
    selector: 'jhi-nhan-dang-liet-si-detail',
    templateUrl: './nhan-dang-liet-si-detail.component.html'
})
export class NhanDangLietSiDetailComponent implements OnInit {
    nhanDangLietSi: INhanDangLietSi;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ nhanDangLietSi }) => {
            this.nhanDangLietSi = nhanDangLietSi;
        });
    }

    previousState() {
        window.history.back();
    }
}
