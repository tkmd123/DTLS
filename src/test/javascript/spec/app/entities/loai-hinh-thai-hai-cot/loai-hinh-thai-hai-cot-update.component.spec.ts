/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { LoaiHinhThaiHaiCotUpdateComponent } from 'app/entities/loai-hinh-thai-hai-cot/loai-hinh-thai-hai-cot-update.component';
import { LoaiHinhThaiHaiCotService } from 'app/entities/loai-hinh-thai-hai-cot/loai-hinh-thai-hai-cot.service';
import { LoaiHinhThaiHaiCot } from 'app/shared/model/loai-hinh-thai-hai-cot.model';

describe('Component Tests', () => {
    describe('LoaiHinhThaiHaiCot Management Update Component', () => {
        let comp: LoaiHinhThaiHaiCotUpdateComponent;
        let fixture: ComponentFixture<LoaiHinhThaiHaiCotUpdateComponent>;
        let service: LoaiHinhThaiHaiCotService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [LoaiHinhThaiHaiCotUpdateComponent]
            })
                .overrideTemplate(LoaiHinhThaiHaiCotUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LoaiHinhThaiHaiCotUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LoaiHinhThaiHaiCotService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new LoaiHinhThaiHaiCot(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.loaiHinhThaiHaiCot = entity;
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
                    const entity = new LoaiHinhThaiHaiCot();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.loaiHinhThaiHaiCot = entity;
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
