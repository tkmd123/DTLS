import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILoaiThaoTac } from 'app/shared/model/loai-thao-tac.model';

@Component({
    selector: 'jhi-loai-thao-tac-detail',
    templateUrl: './loai-thao-tac-detail.component.html'
})
export class LoaiThaoTacDetailComponent implements OnInit {
    loaiThaoTac: ILoaiThaoTac;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ loaiThaoTac }) => {
            this.loaiThaoTac = loaiThaoTac;
        });
    }

    previousState() {
        window.history.back();
    }
}
