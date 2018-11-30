import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IMappingDotBien } from 'app/shared/model/mapping-dot-bien.model';
import { MappingDotBienService } from './mapping-dot-bien.service';

@Component({
    selector: 'jhi-mapping-dot-bien-update',
    templateUrl: './mapping-dot-bien-update.component.html'
})
export class MappingDotBienUpdateComponent implements OnInit {
    mappingDotBien: IMappingDotBien;
    isSaving: boolean;

    constructor(private mappingDotBienService: MappingDotBienService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ mappingDotBien }) => {
            this.mappingDotBien = mappingDotBien;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.mappingDotBien.id !== undefined) {
            this.subscribeToSaveResponse(this.mappingDotBienService.update(this.mappingDotBien));
        } else {
            this.subscribeToSaveResponse(this.mappingDotBienService.create(this.mappingDotBien));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IMappingDotBien>>) {
        result.subscribe((res: HttpResponse<IMappingDotBien>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
