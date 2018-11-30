/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { MappingDotBienUpdateComponent } from 'app/entities/mapping-dot-bien/mapping-dot-bien-update.component';
import { MappingDotBienService } from 'app/entities/mapping-dot-bien/mapping-dot-bien.service';
import { MappingDotBien } from 'app/shared/model/mapping-dot-bien.model';

describe('Component Tests', () => {
    describe('MappingDotBien Management Update Component', () => {
        let comp: MappingDotBienUpdateComponent;
        let fixture: ComponentFixture<MappingDotBienUpdateComponent>;
        let service: MappingDotBienService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [MappingDotBienUpdateComponent]
            })
                .overrideTemplate(MappingDotBienUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MappingDotBienUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MappingDotBienService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new MappingDotBien(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.mappingDotBien = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new MappingDotBien();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.mappingDotBien = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
