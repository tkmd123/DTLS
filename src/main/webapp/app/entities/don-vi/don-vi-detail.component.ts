import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDonVi } from 'app/shared/model/don-vi.model';

@Component({
    selector: 'jhi-don-vi-detail',
    templateUrl: './don-vi-detail.component.html'
})
export class DonViDetailComponent implements OnInit {
    donVi: IDonVi;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ donVi }) => {
            this.donVi = donVi;
        });
    }

    previousState() {
        window.history.back();
    }
}
