import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DtlsSharedModule } from 'app/shared';
import {
    CapBacComponent,
    CapBacDetailComponent,
    CapBacUpdateComponent,
    CapBacDeletePopupComponent,
    CapBacDeleteDialogComponent,
    capBacRoute,
    capBacPopupRoute
} from './';

const ENTITY_STATES = [...capBacRoute, ...capBacPopupRoute];

@NgModule({
    imports: [DtlsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [CapBacComponent, CapBacDetailComponent, CapBacUpdateComponent, CapBacDeleteDialogComponent, CapBacDeletePopupComponent],
    entryComponents: [CapBacComponent, CapBacUpdateComponent, CapBacDeleteDialogComponent, CapBacDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DtlsCapBacModule {}
