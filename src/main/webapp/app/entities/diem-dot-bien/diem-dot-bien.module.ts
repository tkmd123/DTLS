import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DtlsSharedModule } from 'app/shared';
import {
    DiemDotBienComponent,
    DiemDotBienDetailComponent,
    DiemDotBienUpdateComponent,
    DiemDotBienDeletePopupComponent,
    DiemDotBienDeleteDialogComponent,
    diemDotBienRoute,
    diemDotBienPopupRoute
} from './';

const ENTITY_STATES = [...diemDotBienRoute, ...diemDotBienPopupRoute];

@NgModule({
    imports: [DtlsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DiemDotBienComponent,
        DiemDotBienDetailComponent,
        DiemDotBienUpdateComponent,
        DiemDotBienDeleteDialogComponent,
        DiemDotBienDeletePopupComponent
    ],
    entryComponents: [DiemDotBienComponent, DiemDotBienUpdateComponent, DiemDotBienDeleteDialogComponent, DiemDotBienDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DtlsDiemDotBienModule {}
