import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DtlsSharedModule } from 'app/shared';
import {
    HoSoLietSiComponent,
    HoSoLietSiDetailComponent,
    HoSoLietSiUpdateComponent,
    HoSoLietSiDeletePopupComponent,
    HoSoLietSiDeleteDialogComponent,
    hoSoLietSiRoute,
    hoSoLietSiPopupRoute
} from './';

const ENTITY_STATES = [...hoSoLietSiRoute, ...hoSoLietSiPopupRoute];

@NgModule({
    imports: [DtlsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        HoSoLietSiComponent,
        HoSoLietSiDetailComponent,
        HoSoLietSiUpdateComponent,
        HoSoLietSiDeleteDialogComponent,
        HoSoLietSiDeletePopupComponent
    ],
    entryComponents: [HoSoLietSiComponent, HoSoLietSiUpdateComponent, HoSoLietSiDeleteDialogComponent, HoSoLietSiDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DtlsHoSoLietSiModule {}
