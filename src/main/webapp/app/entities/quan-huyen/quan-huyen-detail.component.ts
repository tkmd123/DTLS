import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQuanHuyen } from 'app/shared/model/quan-huyen.model';

@Component({
    selector: 'jhi-quan-huyen-detail',
    templateUrl: './quan-huyen-detail.component.html'
})
export class QuanHuyenDetailComponent implements OnInit {
    quanHuyen: IQuanHuyen;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ quanHuyen }) => {
            this.quanHuyen = quanHuyen;
        });
    }

    previousState() {
        window.history.back();
    }
}
