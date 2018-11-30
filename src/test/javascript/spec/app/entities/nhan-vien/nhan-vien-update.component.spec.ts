/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { NhanVienUpdateComponent } from 'app/entities/nhan-vien/nhan-vien-update.component';
import { NhanVienService } from 'app/entities/nhan-vien/nhan-vien.service';
import { NhanVien } from 'app/shared/model/nhan-vien.model';

describe('Component Tests', () => {
    describe('NhanVien Management Update Component', () => {
        let comp: NhanVienUpdateComponent;
        let fixture: ComponentFixture<NhanVienUpdateComponent>;
        let service: NhanVienService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [NhanVienUpdateComponent]
            })
                .overrideTemplate(NhanVienUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(NhanVienUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NhanVienService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new NhanVien(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.nhanVien = entity;
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
                    const entity = new NhanVien();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.nhanVien = entity;
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
