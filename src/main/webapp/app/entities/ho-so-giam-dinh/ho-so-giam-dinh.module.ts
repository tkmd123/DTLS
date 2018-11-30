import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DtlsSharedModule } from 'app/shared';
import {
    HoSoGiamDinhComponent,
    HoSoGiamDinhDetailComponent,
    HoSoGiamDinhUpdateComponent,
    HoSoGiamDinhDeletePopupComponent,
    HoSoGiamDinhDeleteDialogComponent,
    hoSoGiamDinhRoute,
    hoSoGiamDinhPopupRoute
} from './';

const ENTITY_STATES = [...hoSoGiamDinhRoute, ...hoSoGiamDinhPopupRoute];

@NgModule({
    imports: [DtlsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        HoSoGiamDinhComponent,
        HoSoGiamDinhDetailComponent,
        HoSoGiamDinhUpdateComponent,
        HoSoGiamDinhDeleteDialogComponent,
        HoSoGiamDinhDeletePopupComponent
    ],
    entryComponents: [
        HoSoGiamDinhComponent,
        HoSoGiamDinhUpdateComponent,
        HoSoGiamDinhDeleteDialogComponent,
        HoSoGiamDinhDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DtlsHoSoGiamDinhModule {}
