import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DtlsSharedModule } from 'app/shared';
import {
    PCRPhanUngComponent,
    PCRPhanUngDetailComponent,
    PCRPhanUngUpdateComponent,
    PCRPhanUngDeletePopupComponent,
    PCRPhanUngDeleteDialogComponent,
    pCRPhanUngRoute,
    pCRPhanUngPopupRoute
} from './';

const ENTITY_STATES = [...pCRPhanUngRoute, ...pCRPhanUngPopupRoute];

@NgModule({
    imports: [DtlsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PCRPhanUngComponent,
        PCRPhanUngDetailComponent,
        PCRPhanUngUpdateComponent,
        PCRPhanUngDeleteDialogComponent,
        PCRPhanUngDeletePopupComponent
    ],
    entryComponents: [PCRPhanUngComponent, PCRPhanUngUpdateComponent, PCRPhanUngDeleteDialogComponent, PCRPhanUngDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DtlsPCRPhanUngModule {}
