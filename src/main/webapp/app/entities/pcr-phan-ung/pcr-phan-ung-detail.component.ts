import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPCRPhanUng } from 'app/shared/model/pcr-phan-ung.model';

@Component({
    selector: 'jhi-pcr-phan-ung-detail',
    templateUrl: './pcr-phan-ung-detail.component.html'
})
export class PCRPhanUngDetailComponent implements OnInit {
    pCRPhanUng: IPCRPhanUng;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ pCRPhanUng }) => {
            this.pCRPhanUng = pCRPhanUng;
        });
    }

    previousState() {
        window.history.back();
    }
}
