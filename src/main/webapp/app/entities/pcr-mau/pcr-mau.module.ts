import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DtlsSharedModule } from 'app/shared';
import {
    PCRMauComponent,
    PCRMauDetailComponent,
    PCRMauUpdateComponent,
    PCRMauDeletePopupComponent,
    PCRMauDeleteDialogComponent,
    pCRMauRoute,
    pCRMauPopupRoute
} from './';

const ENTITY_STATES = [...pCRMauRoute, ...pCRMauPopupRoute];

@NgModule({
    imports: [DtlsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [PCRMauComponent, PCRMauDetailComponent, PCRMauUpdateComponent, PCRMauDeleteDialogComponent, PCRMauDeletePopupComponent],
    entryComponents: [PCRMauComponent, PCRMauUpdateComponent, PCRMauDeleteDialogComponent, PCRMauDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DtlsPCRMauModule {}
