import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DtlsSharedModule } from 'app/shared';
import {
    LoaiDiVatComponent,
    LoaiDiVatDetailComponent,
    LoaiDiVatUpdateComponent,
    LoaiDiVatDeletePopupComponent,
    LoaiDiVatDeleteDialogComponent,
    loaiDiVatRoute,
    loaiDiVatPopupRoute
} from './';

const ENTITY_STATES = [...loaiDiVatRoute, ...loaiDiVatPopupRoute];

@NgModule({
    imports: [DtlsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        LoaiDiVatComponent,
        LoaiDiVatDetailComponent,
        LoaiDiVatUpdateComponent,
        LoaiDiVatDeleteDialogComponent,
        LoaiDiVatDeletePopupComponent
    ],
    entryComponents: [LoaiDiVatComponent, LoaiDiVatUpdateComponent, LoaiDiVatDeleteDialogComponent, LoaiDiVatDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DtlsLoaiDiVatModule {}
