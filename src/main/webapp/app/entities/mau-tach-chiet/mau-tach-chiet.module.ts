import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DtlsSharedModule } from 'app/shared';
import {
    MauTachChietComponent,
    MauTachChietDetailComponent,
    MauTachChietUpdateComponent,
    MauTachChietDeletePopupComponent,
    MauTachChietDeleteDialogComponent,
    mauTachChietRoute,
    mauTachChietPopupRoute
} from './';

const ENTITY_STATES = [...mauTachChietRoute, ...mauTachChietPopupRoute];

@NgModule({
    imports: [DtlsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MauTachChietComponent,
        MauTachChietDetailComponent,
        MauTachChietUpdateComponent,
        MauTachChietDeleteDialogComponent,
        MauTachChietDeletePopupComponent
    ],
    entryComponents: [
        MauTachChietComponent,
        MauTachChietUpdateComponent,
        MauTachChietDeleteDialogComponent,
        MauTachChietDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DtlsMauTachChietModule {}
