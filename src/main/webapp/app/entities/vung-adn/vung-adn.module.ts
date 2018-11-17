import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DtlsSharedModule } from 'app/shared';
import {
    VungADNComponent,
    VungADNDetailComponent,
    VungADNUpdateComponent,
    VungADNDeletePopupComponent,
    VungADNDeleteDialogComponent,
    vungADNRoute,
    vungADNPopupRoute
} from './';

const ENTITY_STATES = [...vungADNRoute, ...vungADNPopupRoute];

@NgModule({
    imports: [DtlsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        VungADNComponent,
        VungADNDetailComponent,
        VungADNUpdateComponent,
        VungADNDeleteDialogComponent,
        VungADNDeletePopupComponent
    ],
    entryComponents: [VungADNComponent, VungADNUpdateComponent, VungADNDeleteDialogComponent, VungADNDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DtlsVungADNModule {}
