/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { DonViUpdateComponent } from 'app/entities/don-vi/don-vi-update.component';
import { DonViService } from 'app/entities/don-vi/don-vi.service';
import { DonVi } from 'app/shared/model/don-vi.model';

describe('Component Tests', () => {
    describe('DonVi Management Update Component', () => {
        let comp: DonViUpdateComponent;
        let fixture: ComponentFixture<DonViUpdateComponent>;
        let service: DonViService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [DonViUpdateComponent]
            })
                .overrideTemplate(DonViUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DonViUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DonViService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new DonVi(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.donVi = entity;
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
                    const entity = new DonVi();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.donVi = entity;
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
