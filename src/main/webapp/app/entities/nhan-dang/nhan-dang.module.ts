import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DtlsSharedModule } from 'app/shared';
import {
    NhanDangComponent,
    NhanDangDetailComponent,
    NhanDangUpdateComponent,
    NhanDangDeletePopupComponent,
    NhanDangDeleteDialogComponent,
    nhanDangRoute,
    nhanDangPopupRoute
} from './';

const ENTITY_STATES = [...nhanDangRoute, ...nhanDangPopupRoute];

@NgModule({
    imports: [DtlsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        NhanDangComponent,
        NhanDangDetailComponent,
        NhanDangUpdateComponent,
        NhanDangDeleteDialogComponent,
        NhanDangDeletePopupComponent
    ],
    entryComponents: [NhanDangComponent, NhanDangUpdateComponent, NhanDangDeleteDialogComponent, NhanDangDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DtlsNhanDangModule {}
