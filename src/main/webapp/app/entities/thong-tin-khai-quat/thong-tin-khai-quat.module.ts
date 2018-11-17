import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DtlsSharedModule } from 'app/shared';
import {
    ThongTinKhaiQuatComponent,
    ThongTinKhaiQuatDetailComponent,
    ThongTinKhaiQuatUpdateComponent,
    ThongTinKhaiQuatDeletePopupComponent,
    ThongTinKhaiQuatDeleteDialogComponent,
    thongTinKhaiQuatRoute,
    thongTinKhaiQuatPopupRoute
} from './';

const ENTITY_STATES = [...thongTinKhaiQuatRoute, ...thongTinKhaiQuatPopupRoute];

@NgModule({
    imports: [DtlsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ThongTinKhaiQuatComponent,
        ThongTinKhaiQuatDetailComponent,
        ThongTinKhaiQuatUpdateComponent,
        ThongTinKhaiQuatDeleteDialogComponent,
        ThongTinKhaiQuatDeletePopupComponent
    ],
    entryComponents: [
        ThongTinKhaiQuatComponent,
        ThongTinKhaiQuatUpdateComponent,
        ThongTinKhaiQuatDeleteDialogComponent,
        ThongTinKhaiQuatDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DtlsThongTinKhaiQuatModule {}
