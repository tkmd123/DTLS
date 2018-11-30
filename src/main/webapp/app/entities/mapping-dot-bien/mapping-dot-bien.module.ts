import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DtlsSharedModule } from 'app/shared';
import {
    MappingDotBienComponent,
    MappingDotBienDetailComponent,
    MappingDotBienUpdateComponent,
    MappingDotBienDeletePopupComponent,
    MappingDotBienDeleteDialogComponent,
    mappingDotBienRoute,
    mappingDotBienPopupRoute
} from './';

const ENTITY_STATES = [...mappingDotBienRoute, ...mappingDotBienPopupRoute];

@NgModule({
    imports: [DtlsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MappingDotBienComponent,
        MappingDotBienDetailComponent,
        MappingDotBienUpdateComponent,
        MappingDotBienDeleteDialogComponent,
        MappingDotBienDeletePopupComponent
    ],
    entryComponents: [
        MappingDotBienComponent,
        MappingDotBienUpdateComponent,
        MappingDotBienDeleteDialogComponent,
        MappingDotBienDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DtlsMappingDotBienModule {}
