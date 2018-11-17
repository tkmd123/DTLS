import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DtlsSharedModule } from 'app/shared';
import {
    TinhThanhComponent,
    TinhThanhDetailComponent,
    TinhThanhUpdateComponent,
    TinhThanhDeletePopupComponent,
    TinhThanhDeleteDialogComponent,
    tinhThanhRoute,
    tinhThanhPopupRoute
} from './';

const ENTITY_STATES = [...tinhThanhRoute, ...tinhThanhPopupRoute];

@NgModule({
    imports: [DtlsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TinhThanhComponent,
        TinhThanhDetailComponent,
        TinhThanhUpdateComponent,
        TinhThanhDeleteDialogComponent,
        TinhThanhDeletePopupComponent
    ],
    entryComponents: [TinhThanhComponent, TinhThanhUpdateComponent, TinhThanhDeleteDialogComponent, TinhThanhDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DtlsTinhThanhModule {}
