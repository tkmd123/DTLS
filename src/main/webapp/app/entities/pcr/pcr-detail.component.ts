import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPCR } from 'app/shared/model/pcr.model';

@Component({
    selector: 'jhi-pcr-detail',
    templateUrl: './pcr-detail.component.html'
})
export class PCRDetailComponent implements OnInit {
    pCR: IPCR;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ pCR }) => {
            this.pCR = pCR;
        });
    }

    previousState() {
        window.history.back();
    }
}
