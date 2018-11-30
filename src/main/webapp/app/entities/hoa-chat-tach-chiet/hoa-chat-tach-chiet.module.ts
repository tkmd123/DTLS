import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DtlsSharedModule } from 'app/shared';
import {
    HoaChatTachChietComponent,
    HoaChatTachChietDetailComponent,
    HoaChatTachChietUpdateComponent,
    HoaChatTachChietDeletePopupComponent,
    HoaChatTachChietDeleteDialogComponent,
    hoaChatTachChietRoute,
    hoaChatTachChietPopupRoute
} from './';

const ENTITY_STATES = [...hoaChatTachChietRoute, ...hoaChatTachChietPopupRoute];

@NgModule({
    imports: [DtlsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        HoaChatTachChietComponent,
        HoaChatTachChietDetailComponent,
        HoaChatTachChietUpdateComponent,
        HoaChatTachChietDeleteDialogComponent,
        HoaChatTachChietDeletePopupComponent
    ],
    entryComponents: [
        HoaChatTachChietComponent,
        HoaChatTachChietUpdateComponent,
        HoaChatTachChietDeleteDialogComponent,
        HoaChatTachChietDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DtlsHoaChatTachChietModule {}
