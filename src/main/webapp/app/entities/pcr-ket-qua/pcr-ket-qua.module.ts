import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DtlsSharedModule } from 'app/shared';
import {
    PCRKetQuaComponent,
    PCRKetQuaDetailComponent,
    PCRKetQuaUpdateComponent,
    PCRKetQuaDeletePopupComponent,
    PCRKetQuaDeleteDialogComponent,
    pCRKetQuaRoute,
    pCRKetQuaPopupRoute
} from './';

const ENTITY_STATES = [...pCRKetQuaRoute, ...pCRKetQuaPopupRoute];

@NgModule({
    imports: [DtlsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PCRKetQuaComponent,
        PCRKetQuaDetailComponent,
        PCRKetQuaUpdateComponent,
        PCRKetQuaDeleteDialogComponent,
        PCRKetQuaDeletePopupComponent
    ],
    entryComponents: [PCRKetQuaComponent, PCRKetQuaUpdateComponent, PCRKetQuaDeleteDialogComponent, PCRKetQuaDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DtlsPCRKetQuaModule {}
