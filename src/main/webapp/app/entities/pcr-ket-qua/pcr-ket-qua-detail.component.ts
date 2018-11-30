import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPCRKetQua } from 'app/shared/model/pcr-ket-qua.model';

@Component({
    selector: 'jhi-pcr-ket-qua-detail',
    templateUrl: './pcr-ket-qua-detail.component.html'
})
export class PCRKetQuaDetailComponent implements OnInit {
    pCRKetQua: IPCRKetQua;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ pCRKetQua }) => {
            this.pCRKetQua = pCRKetQua;
        });
    }

    previousState() {
        window.history.back();
    }
}
