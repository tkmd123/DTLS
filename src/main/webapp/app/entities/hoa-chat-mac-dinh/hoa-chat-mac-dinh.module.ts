import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DtlsSharedModule } from 'app/shared';
import {
    HoaChatMacDinhComponent,
    HoaChatMacDinhDetailComponent,
    HoaChatMacDinhUpdateComponent,
    HoaChatMacDinhDeletePopupComponent,
    HoaChatMacDinhDeleteDialogComponent,
    hoaChatMacDinhRoute,
    hoaChatMacDinhPopupRoute
} from './';

const ENTITY_STATES = [...hoaChatMacDinhRoute, ...hoaChatMacDinhPopupRoute];

@NgModule({
    imports: [DtlsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        HoaChatMacDinhComponent,
        HoaChatMacDinhDetailComponent,
        HoaChatMacDinhUpdateComponent,
        HoaChatMacDinhDeleteDialogComponent,
        HoaChatMacDinhDeletePopupComponent
    ],
    entryComponents: [
        HoaChatMacDinhComponent,
        HoaChatMacDinhUpdateComponent,
        HoaChatMacDinhDeleteDialogComponent,
        HoaChatMacDinhDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DtlsHoaChatMacDinhModule {}
