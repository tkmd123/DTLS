import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITrungTam } from 'app/shared/model/trung-tam.model';

@Component({
    selector: 'jhi-trung-tam-detail',
    templateUrl: './trung-tam-detail.component.html'
})
export class TrungTamDetailComponent implements OnInit {
    trungTam: ITrungTam;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ trungTam }) => {
            this.trungTam = trungTam;
        });
    }

    previousState() {
        window.history.back();
    }
}
