/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { ThongTinKhaiQuatUpdateComponent } from 'app/entities/thong-tin-khai-quat/thong-tin-khai-quat-update.component';
import { ThongTinKhaiQuatService } from 'app/entities/thong-tin-khai-quat/thong-tin-khai-quat.service';
import { ThongTinKhaiQuat } from 'app/shared/model/thong-tin-khai-quat.model';

describe('Component Tests', () => {
    describe('ThongTinKhaiQuat Management Update Component', () => {
        let comp: ThongTinKhaiQuatUpdateComponent;
        let fixture: ComponentFixture<ThongTinKhaiQuatUpdateComponent>;
        let service: ThongTinKhaiQuatService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [ThongTinKhaiQuatUpdateComponent]
            })
                .overrideTemplate(ThongTinKhaiQuatUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ThongTinKhaiQuatUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ThongTinKhaiQuatService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ThongTinKhaiQuat(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.thongTinKhaiQuat = entity;
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
                    const entity = new ThongTinKhaiQuat();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.thongTinKhaiQuat = entity;
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
