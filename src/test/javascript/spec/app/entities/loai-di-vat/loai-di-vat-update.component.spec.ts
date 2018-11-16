/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { LoaiDiVatUpdateComponent } from 'app/entities/loai-di-vat/loai-di-vat-update.component';
import { LoaiDiVatService } from 'app/entities/loai-di-vat/loai-di-vat.service';
import { LoaiDiVat } from 'app/shared/model/loai-di-vat.model';

describe('Component Tests', () => {
    describe('LoaiDiVat Management Update Component', () => {
        let comp: LoaiDiVatUpdateComponent;
        let fixture: ComponentFixture<LoaiDiVatUpdateComponent>;
        let service: LoaiDiVatService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [LoaiDiVatUpdateComponent]
            })
                .overrideTemplate(LoaiDiVatUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LoaiDiVatUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LoaiDiVatService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new LoaiDiVat(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.loaiDiVat = entity;
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
                    const entity = new LoaiDiVat();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.loaiDiVat = entity;
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
