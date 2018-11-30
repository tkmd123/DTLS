import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IThongTinKhaiQuat } from 'app/shared/model/thong-tin-khai-quat.model';

@Component({
    selector: 'jhi-thong-tin-khai-quat-detail',
    templateUrl: './thong-tin-khai-quat-detail.component.html'
})
export class ThongTinKhaiQuatDetailComponent implements OnInit {
    thongTinKhaiQuat: IThongTinKhaiQuat;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ thongTinKhaiQuat }) => {
            this.thongTinKhaiQuat = thongTinKhaiQuat;
        });
    }

    previousState() {
        window.history.back();
    }
}
