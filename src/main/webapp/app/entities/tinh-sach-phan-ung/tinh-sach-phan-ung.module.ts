import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DtlsSharedModule } from 'app/shared';
import {
    TinhSachPhanUngComponent,
    TinhSachPhanUngDetailComponent,
    TinhSachPhanUngUpdateComponent,
    TinhSachPhanUngDeletePopupComponent,
    TinhSachPhanUngDeleteDialogComponent,
    tinhSachPhanUngRoute,
    tinhSachPhanUngPopupRoute
} from './';

const ENTITY_STATES = [...tinhSachPhanUngRoute, ...tinhSachPhanUngPopupRoute];

@NgModule({
    imports: [DtlsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TinhSachPhanUngComponent,
        TinhSachPhanUngDetailComponent,
        TinhSachPhanUngUpdateComponent,
        TinhSachPhanUngDeleteDialogComponent,
        TinhSachPhanUngDeletePopupComponent
    ],
    entryComponents: [
        TinhSachPhanUngComponent,
        TinhSachPhanUngUpdateComponent,
        TinhSachPhanUngDeleteDialogComponent,
        TinhSachPhanUngDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DtlsTinhSachPhanUngModule {}
