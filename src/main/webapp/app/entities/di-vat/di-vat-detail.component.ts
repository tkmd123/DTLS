import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDiVat } from 'app/shared/model/di-vat.model';

@Component({
    selector: 'jhi-di-vat-detail',
    templateUrl: './di-vat-detail.component.html'
})
export class DiVatDetailComponent implements OnInit {
    diVat: IDiVat;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ diVat }) => {
            this.diVat = diVat;
        });
    }

    previousState() {
        window.history.back();
    }
}
