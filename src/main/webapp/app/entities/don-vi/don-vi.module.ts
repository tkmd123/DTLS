import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DtlsSharedModule } from 'app/shared';
import {
    DonViComponent,
    DonViDetailComponent,
    DonViUpdateComponent,
    DonViDeletePopupComponent,
    DonViDeleteDialogComponent,
    donViRoute,
    donViPopupRoute
} from './';

const ENTITY_STATES = [...donViRoute, ...donViPopupRoute];

@NgModule({
    imports: [DtlsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [DonViComponent, DonViDetailComponent, DonViUpdateComponent, DonViDeleteDialogComponent, DonViDeletePopupComponent],
    entryComponents: [DonViComponent, DonViUpdateComponent, DonViDeleteDialogComponent, DonViDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DtlsDonViModule {}
