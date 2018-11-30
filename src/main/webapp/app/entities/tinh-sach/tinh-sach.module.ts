import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DtlsSharedModule } from 'app/shared';
import {
    TinhSachComponent,
    TinhSachDetailComponent,
    TinhSachUpdateComponent,
    TinhSachDeletePopupComponent,
    TinhSachDeleteDialogComponent,
    tinhSachRoute,
    tinhSachPopupRoute
} from './';

const ENTITY_STATES = [...tinhSachRoute, ...tinhSachPopupRoute];

@NgModule({
    imports: [DtlsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TinhSachComponent,
        TinhSachDetailComponent,
        TinhSachUpdateComponent,
        TinhSachDeleteDialogComponent,
        TinhSachDeletePopupComponent
    ],
    entryComponents: [TinhSachComponent, TinhSachUpdateComponent, TinhSachDeleteDialogComponent, TinhSachDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DtlsTinhSachModule {}
