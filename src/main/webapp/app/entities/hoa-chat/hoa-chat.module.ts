import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DtlsSharedModule } from 'app/shared';
import {
    HoaChatComponent,
    HoaChatDetailComponent,
    HoaChatUpdateComponent,
    HoaChatDeletePopupComponent,
    HoaChatDeleteDialogComponent,
    hoaChatRoute,
    hoaChatPopupRoute
} from './';

const ENTITY_STATES = [...hoaChatRoute, ...hoaChatPopupRoute];

@NgModule({
    imports: [DtlsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        HoaChatComponent,
        HoaChatDetailComponent,
        HoaChatUpdateComponent,
        HoaChatDeleteDialogComponent,
        HoaChatDeletePopupComponent
    ],
    entryComponents: [HoaChatComponent, HoaChatUpdateComponent, HoaChatDeleteDialogComponent, HoaChatDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DtlsHoaChatModule {}
