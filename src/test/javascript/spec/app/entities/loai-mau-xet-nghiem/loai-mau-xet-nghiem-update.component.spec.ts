/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { LoaiMauXetNghiemUpdateComponent } from 'app/entities/loai-mau-xet-nghiem/loai-mau-xet-nghiem-update.component';
import { LoaiMauXetNghiemService } from 'app/entities/loai-mau-xet-nghiem/loai-mau-xet-nghiem.service';
import { LoaiMauXetNghiem } from 'app/shared/model/loai-mau-xet-nghiem.model';

describe('Component Tests', () => {
    describe('LoaiMauXetNghiem Management Update Component', () => {
        let comp: LoaiMauXetNghiemUpdateComponent;
        let fixture: ComponentFixture<LoaiMauXetNghiemUpdateComponent>;
        let service: LoaiMauXetNghiemService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [LoaiMauXetNghiemUpdateComponent]
            })
                .overrideTemplate(LoaiMauXetNghiemUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LoaiMauXetNghiemUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LoaiMauXetNghiemService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new LoaiMauXetNghiem(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.loaiMauXetNghiem = entity;
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
                    const entity = new LoaiMauXetNghiem();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.loaiMauXetNghiem = entity;
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
