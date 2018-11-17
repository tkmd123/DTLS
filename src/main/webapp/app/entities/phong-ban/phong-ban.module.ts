import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DtlsSharedModule } from 'app/shared';
import {
    PhongBanComponent,
    PhongBanDetailComponent,
    PhongBanUpdateComponent,
    PhongBanDeletePopupComponent,
    PhongBanDeleteDialogComponent,
    phongBanRoute,
    phongBanPopupRoute
} from './';

const ENTITY_STATES = [...phongBanRoute, ...phongBanPopupRoute];

@NgModule({
    imports: [DtlsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PhongBanComponent,
        PhongBanDetailComponent,
        PhongBanUpdateComponent,
        PhongBanDeleteDialogComponent,
        PhongBanDeletePopupComponent
    ],
    entryComponents: [PhongBanComponent, PhongBanUpdateComponent, PhongBanDeleteDialogComponent, PhongBanDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DtlsPhongBanModule {}
