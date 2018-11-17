import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DtlsSharedModule } from 'app/shared';
import {
    QuanHuyenComponent,
    QuanHuyenDetailComponent,
    QuanHuyenUpdateComponent,
    QuanHuyenDeletePopupComponent,
    QuanHuyenDeleteDialogComponent,
    quanHuyenRoute,
    quanHuyenPopupRoute
} from './';

const ENTITY_STATES = [...quanHuyenRoute, ...quanHuyenPopupRoute];

@NgModule({
    imports: [DtlsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QuanHuyenComponent,
        QuanHuyenDetailComponent,
        QuanHuyenUpdateComponent,
        QuanHuyenDeleteDialogComponent,
        QuanHuyenDeletePopupComponent
    ],
    entryComponents: [QuanHuyenComponent, QuanHuyenUpdateComponent, QuanHuyenDeleteDialogComponent, QuanHuyenDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DtlsQuanHuyenModule {}
