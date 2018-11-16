import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DtlsSharedModule } from 'app/shared';
import {
    MauXetNghiemComponent,
    MauXetNghiemDetailComponent,
    MauXetNghiemUpdateComponent,
    MauXetNghiemDeletePopupComponent,
    MauXetNghiemDeleteDialogComponent,
    mauXetNghiemRoute,
    mauXetNghiemPopupRoute
} from './';

const ENTITY_STATES = [...mauXetNghiemRoute, ...mauXetNghiemPopupRoute];

@NgModule({
    imports: [DtlsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MauXetNghiemComponent,
        MauXetNghiemDetailComponent,
        MauXetNghiemUpdateComponent,
        MauXetNghiemDeleteDialogComponent,
        MauXetNghiemDeletePopupComponent
    ],
    entryComponents: [
        MauXetNghiemComponent,
        MauXetNghiemUpdateComponent,
        MauXetNghiemDeleteDialogComponent,
        MauXetNghiemDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DtlsMauXetNghiemModule {}
