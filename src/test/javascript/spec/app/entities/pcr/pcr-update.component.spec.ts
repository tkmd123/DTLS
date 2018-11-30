/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { PCRUpdateComponent } from 'app/entities/pcr/pcr-update.component';
import { PCRService } from 'app/entities/pcr/pcr.service';
import { PCR } from 'app/shared/model/pcr.model';

describe('Component Tests', () => {
    describe('PCR Management Update Component', () => {
        let comp: PCRUpdateComponent;
        let fixture: ComponentFixture<PCRUpdateComponent>;
        let service: PCRService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [PCRUpdateComponent]
            })
                .overrideTemplate(PCRUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PCRUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PCRService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PCR(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.pCR = entity;
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
                    const entity = new PCR();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.pCR = entity;
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
