import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DtlsSharedModule } from 'app/shared';
import {
    TachChietComponent,
    TachChietDetailComponent,
    TachChietUpdateComponent,
    TachChietDeletePopupComponent,
    TachChietDeleteDialogComponent,
    tachChietRoute,
    tachChietPopupRoute
} from './';

const ENTITY_STATES = [...tachChietRoute, ...tachChietPopupRoute];

@NgModule({
    imports: [DtlsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TachChietComponent,
        TachChietDetailComponent,
        TachChietUpdateComponent,
        TachChietDeleteDialogComponent,
        TachChietDeletePopupComponent
    ],
    entryComponents: [TachChietComponent, TachChietUpdateComponent, TachChietDeleteDialogComponent, TachChietDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DtlsTachChietModule {}
