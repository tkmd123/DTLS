import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IThaoTac } from 'app/shared/model/thao-tac.model';

@Component({
    selector: 'jhi-thao-tac-detail',
    templateUrl: './thao-tac-detail.component.html'
})
export class ThaoTacDetailComponent implements OnInit {
    thaoTac: IThaoTac;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ thaoTac }) => {
            this.thaoTac = thaoTac;
        });
    }

    previousState() {
        window.history.back();
    }
}
