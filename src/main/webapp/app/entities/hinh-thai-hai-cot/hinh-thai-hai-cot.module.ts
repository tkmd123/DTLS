import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DtlsSharedModule } from 'app/shared';
import {
    HinhThaiHaiCotComponent,
    HinhThaiHaiCotDetailComponent,
    HinhThaiHaiCotUpdateComponent,
    HinhThaiHaiCotDeletePopupComponent,
    HinhThaiHaiCotDeleteDialogComponent,
    hinhThaiHaiCotRoute,
    hinhThaiHaiCotPopupRoute
} from './';

const ENTITY_STATES = [...hinhThaiHaiCotRoute, ...hinhThaiHaiCotPopupRoute];

@NgModule({
    imports: [DtlsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        HinhThaiHaiCotComponent,
        HinhThaiHaiCotDetailComponent,
        HinhThaiHaiCotUpdateComponent,
        HinhThaiHaiCotDeleteDialogComponent,
        HinhThaiHaiCotDeletePopupComponent
    ],
    entryComponents: [
        HinhThaiHaiCotComponent,
        HinhThaiHaiCotUpdateComponent,
        HinhThaiHaiCotDeleteDialogComponent,
        HinhThaiHaiCotDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DtlsHinhThaiHaiCotModule {}
