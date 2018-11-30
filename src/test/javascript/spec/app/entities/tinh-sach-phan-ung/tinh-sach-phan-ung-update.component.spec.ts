/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { TinhSachPhanUngUpdateComponent } from 'app/entities/tinh-sach-phan-ung/tinh-sach-phan-ung-update.component';
import { TinhSachPhanUngService } from 'app/entities/tinh-sach-phan-ung/tinh-sach-phan-ung.service';
import { TinhSachPhanUng } from 'app/shared/model/tinh-sach-phan-ung.model';

describe('Component Tests', () => {
    describe('TinhSachPhanUng Management Update Component', () => {
        let comp: TinhSachPhanUngUpdateComponent;
        let fixture: ComponentFixture<TinhSachPhanUngUpdateComponent>;
        let service: TinhSachPhanUngService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [TinhSachPhanUngUpdateComponent]
            })
                .overrideTemplate(TinhSachPhanUngUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TinhSachPhanUngUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TinhSachPhanUngService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TinhSachPhanUng(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.tinhSachPhanUng = entity;
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
                    const entity = new TinhSachPhanUng();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.tinhSachPhanUng = entity;
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
