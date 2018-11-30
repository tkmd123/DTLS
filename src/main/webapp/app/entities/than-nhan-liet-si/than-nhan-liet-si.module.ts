import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DtlsSharedModule } from 'app/shared';
import {
    ThanNhanLietSiComponent,
    ThanNhanLietSiDetailComponent,
    ThanNhanLietSiUpdateComponent,
    ThanNhanLietSiDeletePopupComponent,
    ThanNhanLietSiDeleteDialogComponent,
    thanNhanLietSiRoute,
    thanNhanLietSiPopupRoute
} from './';

const ENTITY_STATES = [...thanNhanLietSiRoute, ...thanNhanLietSiPopupRoute];

@NgModule({
    imports: [DtlsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ThanNhanLietSiComponent,
        ThanNhanLietSiDetailComponent,
        ThanNhanLietSiUpdateComponent,
        ThanNhanLietSiDeleteDialogComponent,
        ThanNhanLietSiDeletePopupComponent
    ],
    entryComponents: [
        ThanNhanLietSiComponent,
        ThanNhanLietSiUpdateComponent,
        ThanNhanLietSiDeleteDialogComponent,
        ThanNhanLietSiDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DtlsThanNhanLietSiModule {}
