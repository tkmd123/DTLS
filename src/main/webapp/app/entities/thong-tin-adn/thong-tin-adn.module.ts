import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DtlsSharedModule } from 'app/shared';
import {
    ThongTinADNComponent,
    ThongTinADNDetailComponent,
    ThongTinADNUpdateComponent,
    ThongTinADNDeletePopupComponent,
    ThongTinADNDeleteDialogComponent,
    thongTinADNRoute,
    thongTinADNPopupRoute
} from './';

const ENTITY_STATES = [...thongTinADNRoute, ...thongTinADNPopupRoute];

@NgModule({
    imports: [DtlsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ThongTinADNComponent,
        ThongTinADNDetailComponent,
        ThongTinADNUpdateComponent,
        ThongTinADNDeleteDialogComponent,
        ThongTinADNDeletePopupComponent
    ],
    entryComponents: [ThongTinADNComponent, ThongTinADNUpdateComponent, ThongTinADNDeleteDialogComponent, ThongTinADNDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DtlsThongTinADNModule {}
