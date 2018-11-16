import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DtlsSharedModule } from 'app/shared';
import {
    HaiCotLietSiComponent,
    HaiCotLietSiDetailComponent,
    HaiCotLietSiUpdateComponent,
    HaiCotLietSiDeletePopupComponent,
    HaiCotLietSiDeleteDialogComponent,
    haiCotLietSiRoute,
    haiCotLietSiPopupRoute
} from './';

const ENTITY_STATES = [...haiCotLietSiRoute, ...haiCotLietSiPopupRoute];

@NgModule({
    imports: [DtlsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        HaiCotLietSiComponent,
        HaiCotLietSiDetailComponent,
        HaiCotLietSiUpdateComponent,
        HaiCotLietSiDeleteDialogComponent,
        HaiCotLietSiDeletePopupComponent
    ],
    entryComponents: [
        HaiCotLietSiComponent,
        HaiCotLietSiUpdateComponent,
        HaiCotLietSiDeleteDialogComponent,
        HaiCotLietSiDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DtlsHaiCotLietSiModule {}
