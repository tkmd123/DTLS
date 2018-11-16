/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { NhanDangLietSiUpdateComponent } from 'app/entities/nhan-dang-liet-si/nhan-dang-liet-si-update.component';
import { NhanDangLietSiService } from 'app/entities/nhan-dang-liet-si/nhan-dang-liet-si.service';
import { NhanDangLietSi } from 'app/shared/model/nhan-dang-liet-si.model';

describe('Component Tests', () => {
    describe('NhanDangLietSi Management Update Component', () => {
        let comp: NhanDangLietSiUpdateComponent;
        let fixture: ComponentFixture<NhanDangLietSiUpdateComponent>;
        let service: NhanDangLietSiService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [NhanDangLietSiUpdateComponent]
            })
                .overrideTemplate(NhanDangLietSiUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(NhanDangLietSiUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NhanDangLietSiService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new NhanDangLietSi(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.nhanDangLietSi = entity;
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
                    const entity = new NhanDangLietSi();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.nhanDangLietSi = entity;
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
