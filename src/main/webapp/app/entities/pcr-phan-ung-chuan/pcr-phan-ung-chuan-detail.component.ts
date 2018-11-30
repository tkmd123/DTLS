import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPCRPhanUngChuan } from 'app/shared/model/pcr-phan-ung-chuan.model';

@Component({
    selector: 'jhi-pcr-phan-ung-chuan-detail',
    templateUrl: './pcr-phan-ung-chuan-detail.component.html'
})
export class PCRPhanUngChuanDetailComponent implements OnInit {
    pCRPhanUngChuan: IPCRPhanUngChuan;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ pCRPhanUngChuan }) => {
            this.pCRPhanUngChuan = pCRPhanUngChuan;
        });
    }

    previousState() {
        window.history.back();
    }
}
