import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DtlsSharedModule } from 'app/shared';
import {
    DonViThoiKyComponent,
    DonViThoiKyDetailComponent,
    DonViThoiKyUpdateComponent,
    DonViThoiKyDeletePopupComponent,
    DonViThoiKyDeleteDialogComponent,
    donViThoiKyRoute,
    donViThoiKyPopupRoute
} from './';

const ENTITY_STATES = [...donViThoiKyRoute, ...donViThoiKyPopupRoute];

@NgModule({
    imports: [DtlsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DonViThoiKyComponent,
        DonViThoiKyDetailComponent,
        DonViThoiKyUpdateComponent,
        DonViThoiKyDeleteDialogComponent,
        DonViThoiKyDeletePopupComponent
    ],
    entryComponents: [DonViThoiKyComponent, DonViThoiKyUpdateComponent, DonViThoiKyDeleteDialogComponent, DonViThoiKyDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DtlsDonViThoiKyModule {}
