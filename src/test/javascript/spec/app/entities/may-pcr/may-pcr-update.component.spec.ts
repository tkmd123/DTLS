/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { MayPCRUpdateComponent } from 'app/entities/may-pcr/may-pcr-update.component';
import { MayPCRService } from 'app/entities/may-pcr/may-pcr.service';
import { MayPCR } from 'app/shared/model/may-pcr.model';

describe('Component Tests', () => {
    describe('MayPCR Management Update Component', () => {
        let comp: MayPCRUpdateComponent;
        let fixture: ComponentFixture<MayPCRUpdateComponent>;
        let service: MayPCRService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [MayPCRUpdateComponent]
            })
                .overrideTemplate(MayPCRUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MayPCRUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MayPCRService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new MayPCR(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.mayPCR = entity;
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
                    const entity = new MayPCR();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.mayPCR = entity;
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
