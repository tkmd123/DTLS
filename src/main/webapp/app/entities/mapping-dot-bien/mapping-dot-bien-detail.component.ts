import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMappingDotBien } from 'app/shared/model/mapping-dot-bien.model';

@Component({
    selector: 'jhi-mapping-dot-bien-detail',
    templateUrl: './mapping-dot-bien-detail.component.html'
})
export class MappingDotBienDetailComponent implements OnInit {
    mappingDotBien: IMappingDotBien;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ mappingDotBien }) => {
            this.mappingDotBien = mappingDotBien;
        });
    }

    previousState() {
        window.history.back();
    }
}
