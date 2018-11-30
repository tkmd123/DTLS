import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DtlsSharedModule } from 'app/shared';
import {
    PCRComponent,
    PCRDetailComponent,
    PCRUpdateComponent,
    PCRDeletePopupComponent,
    PCRDeleteDialogComponent,
    pCRRoute,
    pCRPopupRoute
} from './';

const ENTITY_STATES = [...pCRRoute, ...pCRPopupRoute];

@NgModule({
    imports: [DtlsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [PCRComponent, PCRDetailComponent, PCRUpdateComponent, PCRDeleteDialogComponent, PCRDeletePopupComponent],
    entryComponents: [PCRComponent, PCRUpdateComponent, PCRDeleteDialogComponent, PCRDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DtlsPCRModule {}
