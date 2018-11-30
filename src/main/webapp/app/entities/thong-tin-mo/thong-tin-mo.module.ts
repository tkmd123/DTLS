import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DtlsSharedModule } from 'app/shared';
import {
    ThongTinMoComponent,
    ThongTinMoDetailComponent,
    ThongTinMoUpdateComponent,
    ThongTinMoDeletePopupComponent,
    ThongTinMoDeleteDialogComponent,
    thongTinMoRoute,
    thongTinMoPopupRoute
} from './';

const ENTITY_STATES = [...thongTinMoRoute, ...thongTinMoPopupRoute];

@NgModule({
    imports: [DtlsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ThongTinMoComponent,
        ThongTinMoDetailComponent,
        ThongTinMoUpdateComponent,
        ThongTinMoDeleteDialogComponent,
        ThongTinMoDeletePopupComponent
    ],
    entryComponents: [ThongTinMoComponent, ThongTinMoUpdateComponent, ThongTinMoDeleteDialogComponent, ThongTinMoDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DtlsThongTinMoModule {}
