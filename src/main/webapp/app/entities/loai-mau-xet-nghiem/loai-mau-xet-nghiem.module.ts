import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DtlsSharedModule } from 'app/shared';
import {
    LoaiMauXetNghiemComponent,
    LoaiMauXetNghiemDetailComponent,
    LoaiMauXetNghiemUpdateComponent,
    LoaiMauXetNghiemDeletePopupComponent,
    LoaiMauXetNghiemDeleteDialogComponent,
    loaiMauXetNghiemRoute,
    loaiMauXetNghiemPopupRoute
} from './';

const ENTITY_STATES = [...loaiMauXetNghiemRoute, ...loaiMauXetNghiemPopupRoute];

@NgModule({
    imports: [DtlsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        LoaiMauXetNghiemComponent,
        LoaiMauXetNghiemDetailComponent,
        LoaiMauXetNghiemUpdateComponent,
        LoaiMauXetNghiemDeleteDialogComponent,
        LoaiMauXetNghiemDeletePopupComponent
    ],
    entryComponents: [
        LoaiMauXetNghiemComponent,
        LoaiMauXetNghiemUpdateComponent,
        LoaiMauXetNghiemDeleteDialogComponent,
        LoaiMauXetNghiemDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DtlsLoaiMauXetNghiemModule {}
