import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DtlsSharedModule } from 'app/shared';
import {
    LoaiHinhThaiHaiCotComponent,
    LoaiHinhThaiHaiCotDetailComponent,
    LoaiHinhThaiHaiCotUpdateComponent,
    LoaiHinhThaiHaiCotDeletePopupComponent,
    LoaiHinhThaiHaiCotDeleteDialogComponent,
    loaiHinhThaiHaiCotRoute,
    loaiHinhThaiHaiCotPopupRoute
} from './';

const ENTITY_STATES = [...loaiHinhThaiHaiCotRoute, ...loaiHinhThaiHaiCotPopupRoute];

@NgModule({
    imports: [DtlsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        LoaiHinhThaiHaiCotComponent,
        LoaiHinhThaiHaiCotDetailComponent,
        LoaiHinhThaiHaiCotUpdateComponent,
        LoaiHinhThaiHaiCotDeleteDialogComponent,
        LoaiHinhThaiHaiCotDeletePopupComponent
    ],
    entryComponents: [
        LoaiHinhThaiHaiCotComponent,
        LoaiHinhThaiHaiCotUpdateComponent,
        LoaiHinhThaiHaiCotDeleteDialogComponent,
        LoaiHinhThaiHaiCotDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DtlsLoaiHinhThaiHaiCotModule {}
