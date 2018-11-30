import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IThanNhanLietSi } from 'app/shared/model/than-nhan-liet-si.model';

@Component({
    selector: 'jhi-than-nhan-liet-si-detail',
    templateUrl: './than-nhan-liet-si-detail.component.html'
})
export class ThanNhanLietSiDetailComponent implements OnInit {
    thanNhanLietSi: IThanNhanLietSi;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ thanNhanLietSi }) => {
            this.thanNhanLietSi = thanNhanLietSi;
        });
    }

    previousState() {
        window.history.back();
    }
}
