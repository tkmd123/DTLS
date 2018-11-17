import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INghiaTrang } from 'app/shared/model/nghia-trang.model';

@Component({
    selector: 'jhi-nghia-trang-detail',
    templateUrl: './nghia-trang-detail.component.html'
})
export class NghiaTrangDetailComponent implements OnInit {
    nghiaTrang: INghiaTrang;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ nghiaTrang }) => {
            this.nghiaTrang = nghiaTrang;
        });
    }

    previousState() {
        window.history.back();
    }
}
