import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DtlsSharedModule } from 'app/shared';
import {
    HoSoThanNhanComponent,
    HoSoThanNhanDetailComponent,
    HoSoThanNhanUpdateComponent,
    HoSoThanNhanDeletePopupComponent,
    HoSoThanNhanDeleteDialogComponent,
    hoSoThanNhanRoute,
    hoSoThanNhanPopupRoute
} from './';

const ENTITY_STATES = [...hoSoThanNhanRoute, ...hoSoThanNhanPopupRoute];

@NgModule({
    imports: [DtlsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        HoSoThanNhanComponent,
        HoSoThanNhanDetailComponent,
        HoSoThanNhanUpdateComponent,
        HoSoThanNhanDeleteDialogComponent,
        HoSoThanNhanDeletePopupComponent
    ],
    entryComponents: [
        HoSoThanNhanComponent,
        HoSoThanNhanUpdateComponent,
        HoSoThanNhanDeleteDialogComponent,
        HoSoThanNhanDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DtlsHoSoThanNhanModule {}
