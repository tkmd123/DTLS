import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DtlsSharedModule } from 'app/shared';
import {
    PhuongXaComponent,
    PhuongXaDetailComponent,
    PhuongXaUpdateComponent,
    PhuongXaDeletePopupComponent,
    PhuongXaDeleteDialogComponent,
    phuongXaRoute,
    phuongXaPopupRoute
} from './';

const ENTITY_STATES = [...phuongXaRoute, ...phuongXaPopupRoute];

@NgModule({
    imports: [DtlsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PhuongXaComponent,
        PhuongXaDetailComponent,
        PhuongXaUpdateComponent,
        PhuongXaDeleteDialogComponent,
        PhuongXaDeletePopupComponent
    ],
    entryComponents: [PhuongXaComponent, PhuongXaUpdateComponent, PhuongXaDeleteDialogComponent, PhuongXaDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DtlsPhuongXaModule {}
