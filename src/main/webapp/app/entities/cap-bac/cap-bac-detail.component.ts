import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICapBac } from 'app/shared/model/cap-bac.model';

@Component({
    selector: 'jhi-cap-bac-detail',
    templateUrl: './cap-bac-detail.component.html'
})
export class CapBacDetailComponent implements OnInit {
    capBac: ICapBac;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ capBac }) => {
            this.capBac = capBac;
        });
    }

    previousState() {
        window.history.back();
    }
}
