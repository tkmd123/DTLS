import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMayPCR } from 'app/shared/model/may-pcr.model';

@Component({
    selector: 'jhi-may-pcr-detail',
    templateUrl: './may-pcr-detail.component.html'
})
export class MayPCRDetailComponent implements OnInit {
    mayPCR: IMayPCR;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ mayPCR }) => {
            this.mayPCR = mayPCR;
        });
    }

    previousState() {
        window.history.back();
    }
}
