/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { PCRMauUpdateComponent } from 'app/entities/pcr-mau/pcr-mau-update.component';
import { PCRMauService } from 'app/entities/pcr-mau/pcr-mau.service';
import { PCRMau } from 'app/shared/model/pcr-mau.model';

describe('Component Tests', () => {
    describe('PCRMau Management Update Component', () => {
        let comp: PCRMauUpdateComponent;
        let fixture: ComponentFixture<PCRMauUpdateComponent>;
        let service: PCRMauService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [PCRMauUpdateComponent]
            })
                .overrideTemplate(PCRMauUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PCRMauUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PCRMauService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PCRMau(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.pCRMau = entity;
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
                    const entity = new PCRMau();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.pCRMau = entity;
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
