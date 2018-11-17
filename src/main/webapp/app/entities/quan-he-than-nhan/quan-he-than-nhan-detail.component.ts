import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQuanHeThanNhan } from 'app/shared/model/quan-he-than-nhan.model';

@Component({
    selector: 'jhi-quan-he-than-nhan-detail',
    templateUrl: './quan-he-than-nhan-detail.component.html'
})
export class QuanHeThanNhanDetailComponent implements OnInit {
    quanHeThanNhan: IQuanHeThanNhan;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ quanHeThanNhan }) => {
            this.quanHeThanNhan = quanHeThanNhan;
        });
    }

    previousState() {
        window.history.back();
    }
}
