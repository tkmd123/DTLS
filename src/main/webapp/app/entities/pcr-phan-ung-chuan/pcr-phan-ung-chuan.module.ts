import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DtlsSharedModule } from 'app/shared';
import {
    PCRPhanUngChuanComponent,
    PCRPhanUngChuanDetailComponent,
    PCRPhanUngChuanUpdateComponent,
    PCRPhanUngChuanDeletePopupComponent,
    PCRPhanUngChuanDeleteDialogComponent,
    pCRPhanUngChuanRoute,
    pCRPhanUngChuanPopupRoute
} from './';

const ENTITY_STATES = [...pCRPhanUngChuanRoute, ...pCRPhanUngChuanPopupRoute];

@NgModule({
    imports: [DtlsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PCRPhanUngChuanComponent,
        PCRPhanUngChuanDetailComponent,
        PCRPhanUngChuanUpdateComponent,
        PCRPhanUngChuanDeleteDialogComponent,
        PCRPhanUngChuanDeletePopupComponent
    ],
    entryComponents: [
        PCRPhanUngChuanComponent,
        PCRPhanUngChuanUpdateComponent,
        PCRPhanUngChuanDeleteDialogComponent,
        PCRPhanUngChuanDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DtlsPCRPhanUngChuanModule {}
