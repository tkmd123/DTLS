import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DtlsSharedModule } from 'app/shared';
import {
    LoaiThaoTacComponent,
    LoaiThaoTacDetailComponent,
    LoaiThaoTacUpdateComponent,
    LoaiThaoTacDeletePopupComponent,
    LoaiThaoTacDeleteDialogComponent,
    loaiThaoTacRoute,
    loaiThaoTacPopupRoute
} from './';

const ENTITY_STATES = [...loaiThaoTacRoute, ...loaiThaoTacPopupRoute];

@NgModule({
    imports: [DtlsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        LoaiThaoTacComponent,
        LoaiThaoTacDetailComponent,
        LoaiThaoTacUpdateComponent,
        LoaiThaoTacDeleteDialogComponent,
        LoaiThaoTacDeletePopupComponent
    ],
    entryComponents: [LoaiThaoTacComponent, LoaiThaoTacUpdateComponent, LoaiThaoTacDeleteDialogComponent, LoaiThaoTacDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DtlsLoaiThaoTacModule {}
