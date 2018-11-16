/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { CapBacUpdateComponent } from 'app/entities/cap-bac/cap-bac-update.component';
import { CapBacService } from 'app/entities/cap-bac/cap-bac.service';
import { CapBac } from 'app/shared/model/cap-bac.model';

describe('Component Tests', () => {
    describe('CapBac Management Update Component', () => {
        let comp: CapBacUpdateComponent;
        let fixture: ComponentFixture<CapBacUpdateComponent>;
        let service: CapBacService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [CapBacUpdateComponent]
            })
                .overrideTemplate(CapBacUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CapBacUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CapBacService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CapBac(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.capBac = entity;
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
                    const entity = new CapBac();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.capBac = entity;
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
