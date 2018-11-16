import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DtlsSharedModule } from 'app/shared';
import {
    ThaoTacComponent,
    ThaoTacDetailComponent,
    ThaoTacUpdateComponent,
    ThaoTacDeletePopupComponent,
    ThaoTacDeleteDialogComponent,
    thaoTacRoute,
    thaoTacPopupRoute
} from './';

const ENTITY_STATES = [...thaoTacRoute, ...thaoTacPopupRoute];

@NgModule({
    imports: [DtlsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ThaoTacComponent,
        ThaoTacDetailComponent,
        ThaoTacUpdateComponent,
        ThaoTacDeleteDialogComponent,
        ThaoTacDeletePopupComponent
    ],
    entryComponents: [ThaoTacComponent, ThaoTacUpdateComponent, ThaoTacDeleteDialogComponent, ThaoTacDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DtlsThaoTacModule {}
