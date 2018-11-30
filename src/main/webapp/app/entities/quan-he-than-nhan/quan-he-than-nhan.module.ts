import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DtlsSharedModule } from 'app/shared';
import {
    QuanHeThanNhanComponent,
    QuanHeThanNhanDetailComponent,
    QuanHeThanNhanUpdateComponent,
    QuanHeThanNhanDeletePopupComponent,
    QuanHeThanNhanDeleteDialogComponent,
    quanHeThanNhanRoute,
    quanHeThanNhanPopupRoute
} from './';

const ENTITY_STATES = [...quanHeThanNhanRoute, ...quanHeThanNhanPopupRoute];

@NgModule({
    imports: [DtlsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QuanHeThanNhanComponent,
        QuanHeThanNhanDetailComponent,
        QuanHeThanNhanUpdateComponent,
        QuanHeThanNhanDeleteDialogComponent,
        QuanHeThanNhanDeletePopupComponent
    ],
    entryComponents: [
        QuanHeThanNhanComponent,
        QuanHeThanNhanUpdateComponent,
        QuanHeThanNhanDeleteDialogComponent,
        QuanHeThanNhanDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DtlsQuanHeThanNhanModule {}
