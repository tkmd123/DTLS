/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { NhanDangUpdateComponent } from 'app/entities/nhan-dang/nhan-dang-update.component';
import { NhanDangService } from 'app/entities/nhan-dang/nhan-dang.service';
import { NhanDang } from 'app/shared/model/nhan-dang.model';

describe('Component Tests', () => {
    describe('NhanDang Management Update Component', () => {
        let comp: NhanDangUpdateComponent;
        let fixture: ComponentFixture<NhanDangUpdateComponent>;
        let service: NhanDangService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [NhanDangUpdateComponent]
            })
                .overrideTemplate(NhanDangUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(NhanDangUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NhanDangService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new NhanDang(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.nhanDang = entity;
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
                    const entity = new NhanDang();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.nhanDang = entity;
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
