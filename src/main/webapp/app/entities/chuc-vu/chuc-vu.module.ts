import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DtlsSharedModule } from 'app/shared';
import {
    ChucVuComponent,
    ChucVuDetailComponent,
    ChucVuUpdateComponent,
    ChucVuDeletePopupComponent,
    ChucVuDeleteDialogComponent,
    chucVuRoute,
    chucVuPopupRoute
} from './';

const ENTITY_STATES = [...chucVuRoute, ...chucVuPopupRoute];

@NgModule({
    imports: [DtlsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [ChucVuComponent, ChucVuDetailComponent, ChucVuUpdateComponent, ChucVuDeleteDialogComponent, ChucVuDeletePopupComponent],
    entryComponents: [ChucVuComponent, ChucVuUpdateComponent, ChucVuDeleteDialogComponent, ChucVuDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DtlsChucVuModule {}
