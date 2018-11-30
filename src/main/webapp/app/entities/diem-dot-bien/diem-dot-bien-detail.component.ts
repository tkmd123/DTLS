import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDiemDotBien } from 'app/shared/model/diem-dot-bien.model';

@Component({
    selector: 'jhi-diem-dot-bien-detail',
    templateUrl: './diem-dot-bien-detail.component.html'
})
export class DiemDotBienDetailComponent implements OnInit {
    diemDotBien: IDiemDotBien;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ diemDotBien }) => {
            this.diemDotBien = diemDotBien;
        });
    }

    previousState() {
        window.history.back();
    }
}
