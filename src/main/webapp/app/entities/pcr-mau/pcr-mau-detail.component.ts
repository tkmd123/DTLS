import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPCRMau } from 'app/shared/model/pcr-mau.model';

@Component({
    selector: 'jhi-pcr-mau-detail',
    templateUrl: './pcr-mau-detail.component.html'
})
export class PCRMauDetailComponent implements OnInit {
    pCRMau: IPCRMau;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ pCRMau }) => {
            this.pCRMau = pCRMau;
        });
    }

    previousState() {
        window.history.back();
    }
}
