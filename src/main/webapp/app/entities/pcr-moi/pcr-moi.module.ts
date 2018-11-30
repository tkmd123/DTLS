import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DtlsSharedModule } from 'app/shared';
import {
    PCRMoiComponent,
    PCRMoiDetailComponent,
    PCRMoiUpdateComponent,
    PCRMoiDeletePopupComponent,
    PCRMoiDeleteDialogComponent,
    pCRMoiRoute,
    pCRMoiPopupRoute
} from './';

const ENTITY_STATES = [...pCRMoiRoute, ...pCRMoiPopupRoute];

@NgModule({
    imports: [DtlsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [PCRMoiComponent, PCRMoiDetailComponent, PCRMoiUpdateComponent, PCRMoiDeleteDialogComponent, PCRMoiDeletePopupComponent],
    entryComponents: [PCRMoiComponent, PCRMoiUpdateComponent, PCRMoiDeleteDialogComponent, PCRMoiDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DtlsPCRMoiModule {}
