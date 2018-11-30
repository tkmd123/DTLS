/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { PCRMoiUpdateComponent } from 'app/entities/pcr-moi/pcr-moi-update.component';
import { PCRMoiService } from 'app/entities/pcr-moi/pcr-moi.service';
import { PCRMoi } from 'app/shared/model/pcr-moi.model';

describe('Component Tests', () => {
    describe('PCRMoi Management Update Component', () => {
        let comp: PCRMoiUpdateComponent;
        let fixture: ComponentFixture<PCRMoiUpdateComponent>;
        let service: PCRMoiService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [PCRMoiUpdateComponent]
            })
                .overrideTemplate(PCRMoiUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PCRMoiUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PCRMoiService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PCRMoi(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.pCRMoi = entity;
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
                    const entity = new PCRMoi();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.pCRMoi = entity;
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
