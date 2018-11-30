/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { PCRPhanUngUpdateComponent } from 'app/entities/pcr-phan-ung/pcr-phan-ung-update.component';
import { PCRPhanUngService } from 'app/entities/pcr-phan-ung/pcr-phan-ung.service';
import { PCRPhanUng } from 'app/shared/model/pcr-phan-ung.model';

describe('Component Tests', () => {
    describe('PCRPhanUng Management Update Component', () => {
        let comp: PCRPhanUngUpdateComponent;
        let fixture: ComponentFixture<PCRPhanUngUpdateComponent>;
        let service: PCRPhanUngService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [PCRPhanUngUpdateComponent]
            })
                .overrideTemplate(PCRPhanUngUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PCRPhanUngUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PCRPhanUngService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PCRPhanUng(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.pCRPhanUng = entity;
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
                    const entity = new PCRPhanUng();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.pCRPhanUng = entity;
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
