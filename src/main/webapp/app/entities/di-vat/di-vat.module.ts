import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DtlsSharedModule } from 'app/shared';
import {
    DiVatComponent,
    DiVatDetailComponent,
    DiVatUpdateComponent,
    DiVatDeletePopupComponent,
    DiVatDeleteDialogComponent,
    diVatRoute,
    diVatPopupRoute
} from './';

const ENTITY_STATES = [...diVatRoute, ...diVatPopupRoute];

@NgModule({
    imports: [DtlsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [DiVatComponent, DiVatDetailComponent, DiVatUpdateComponent, DiVatDeleteDialogComponent, DiVatDeletePopupComponent],
    entryComponents: [DiVatComponent, DiVatUpdateComponent, DiVatDeleteDialogComponent, DiVatDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DtlsDiVatModule {}
