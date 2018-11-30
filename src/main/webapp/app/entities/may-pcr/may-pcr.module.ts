import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DtlsSharedModule } from 'app/shared';
import {
    MayPCRComponent,
    MayPCRDetailComponent,
    MayPCRUpdateComponent,
    MayPCRDeletePopupComponent,
    MayPCRDeleteDialogComponent,
    mayPCRRoute,
    mayPCRPopupRoute
} from './';

const ENTITY_STATES = [...mayPCRRoute, ...mayPCRPopupRoute];

@NgModule({
    imports: [DtlsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [MayPCRComponent, MayPCRDetailComponent, MayPCRUpdateComponent, MayPCRDeleteDialogComponent, MayPCRDeletePopupComponent],
    entryComponents: [MayPCRComponent, MayPCRUpdateComponent, MayPCRDeleteDialogComponent, MayPCRDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DtlsMayPCRModule {}
