import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPCRMoi } from 'app/shared/model/pcr-moi.model';

@Component({
    selector: 'jhi-pcr-moi-detail',
    templateUrl: './pcr-moi-detail.component.html'
})
export class PCRMoiDetailComponent implements OnInit {
    pCRMoi: IPCRMoi;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ pCRMoi }) => {
            this.pCRMoi = pCRMoi;
        });
    }

    previousState() {
        window.history.back();
    }
}
