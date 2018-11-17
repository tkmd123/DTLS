import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IChucVu } from 'app/shared/model/chuc-vu.model';

@Component({
    selector: 'jhi-chuc-vu-detail',
    templateUrl: './chuc-vu-detail.component.html'
})
export class ChucVuDetailComponent implements OnInit {
    chucVu: IChucVu;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ chucVu }) => {
            this.chucVu = chucVu;
        });
    }

    previousState() {
        window.history.back();
    }
}
