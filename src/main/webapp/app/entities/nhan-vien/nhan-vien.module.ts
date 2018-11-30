import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DtlsSharedModule } from 'app/shared';
import { DtlsAdminModule } from 'app/admin/admin.module';
import {
    NhanVienComponent,
    NhanVienDetailComponent,
    NhanVienUpdateComponent,
    NhanVienDeletePopupComponent,
    NhanVienDeleteDialogComponent,
    nhanVienRoute,
    nhanVienPopupRoute
} from './';

const ENTITY_STATES = [...nhanVienRoute, ...nhanVienPopupRoute];

@NgModule({
    imports: [DtlsSharedModule, DtlsAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        NhanVienComponent,
        NhanVienDetailComponent,
        NhanVienUpdateComponent,
        NhanVienDeleteDialogComponent,
        NhanVienDeletePopupComponent
    ],
    entryComponents: [NhanVienComponent, NhanVienUpdateComponent, NhanVienDeleteDialogComponent, NhanVienDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DtlsNhanVienModule {}
