import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DtlsSharedModule } from 'app/shared';
import {
    TrungTamComponent,
    TrungTamDetailComponent,
    TrungTamUpdateComponent,
    TrungTamDeletePopupComponent,
    TrungTamDeleteDialogComponent,
    trungTamRoute,
    trungTamPopupRoute
} from './';

const ENTITY_STATES = [...trungTamRoute, ...trungTamPopupRoute];

@NgModule({
    imports: [DtlsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TrungTamComponent,
        TrungTamDetailComponent,
        TrungTamUpdateComponent,
        TrungTamDeleteDialogComponent,
        TrungTamDeletePopupComponent
    ],
    entryComponents: [TrungTamComponent, TrungTamUpdateComponent, TrungTamDeleteDialogComponent, TrungTamDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DtlsTrungTamModule {}
