/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { NghiaTrangUpdateComponent } from 'app/entities/nghia-trang/nghia-trang-update.component';
import { NghiaTrangService } from 'app/entities/nghia-trang/nghia-trang.service';
import { NghiaTrang } from 'app/shared/model/nghia-trang.model';

describe('Component Tests', () => {
    describe('NghiaTrang Management Update Component', () => {
        let comp: NghiaTrangUpdateComponent;
        let fixture: ComponentFixture<NghiaTrangUpdateComponent>;
        let service: NghiaTrangService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [NghiaTrangUpdateComponent]
            })
                .overrideTemplate(NghiaTrangUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(NghiaTrangUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NghiaTrangService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new NghiaTrang(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.nghiaTrang = entity;
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
                    const entity = new NghiaTrang();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.nghiaTrang = entity;
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
