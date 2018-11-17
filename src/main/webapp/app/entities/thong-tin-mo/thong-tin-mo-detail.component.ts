import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IThongTinMo } from 'app/shared/model/thong-tin-mo.model';

@Component({
    selector: 'jhi-thong-tin-mo-detail',
    templateUrl: './thong-tin-mo-detail.component.html'
})
export class ThongTinMoDetailComponent implements OnInit {
    thongTinMo: IThongTinMo;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ thongTinMo }) => {
            this.thongTinMo = thongTinMo;
        });
    }

    previousState() {
        window.history.back();
    }
}
