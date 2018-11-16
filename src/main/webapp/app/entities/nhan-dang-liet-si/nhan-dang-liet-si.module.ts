import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DtlsSharedModule } from 'app/shared';
import {
    NhanDangLietSiComponent,
    NhanDangLietSiDetailComponent,
    NhanDangLietSiUpdateComponent,
    NhanDangLietSiDeletePopupComponent,
    NhanDangLietSiDeleteDialogComponent,
    nhanDangLietSiRoute,
    nhanDangLietSiPopupRoute
} from './';

const ENTITY_STATES = [...nhanDangLietSiRoute, ...nhanDangLietSiPopupRoute];

@NgModule({
    imports: [DtlsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        NhanDangLietSiComponent,
        NhanDangLietSiDetailComponent,
        NhanDangLietSiUpdateComponent,
        NhanDangLietSiDeleteDialogComponent,
        NhanDangLietSiDeletePopupComponent
    ],
    entryComponents: [
        NhanDangLietSiComponent,
        NhanDangLietSiUpdateComponent,
        NhanDangLietSiDeleteDialogComponent,
        NhanDangLietSiDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DtlsNhanDangLietSiModule {}
