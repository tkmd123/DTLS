import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DtlsSharedModule } from 'app/shared';
import {
    NghiaTrangComponent,
    NghiaTrangDetailComponent,
    NghiaTrangUpdateComponent,
    NghiaTrangDeletePopupComponent,
    NghiaTrangDeleteDialogComponent,
    nghiaTrangRoute,
    nghiaTrangPopupRoute
} from './';

const ENTITY_STATES = [...nghiaTrangRoute, ...nghiaTrangPopupRoute];

@NgModule({
    imports: [DtlsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        NghiaTrangComponent,
        NghiaTrangDetailComponent,
        NghiaTrangUpdateComponent,
        NghiaTrangDeleteDialogComponent,
        NghiaTrangDeletePopupComponent
    ],
    entryComponents: [NghiaTrangComponent, NghiaTrangUpdateComponent, NghiaTrangDeleteDialogComponent, NghiaTrangDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DtlsNghiaTrangModule {}
