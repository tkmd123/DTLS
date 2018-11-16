/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { QuanHuyenUpdateComponent } from 'app/entities/quan-huyen/quan-huyen-update.component';
import { QuanHuyenService } from 'app/entities/quan-huyen/quan-huyen.service';
import { QuanHuyen } from 'app/shared/model/quan-huyen.model';

describe('Component Tests', () => {
    describe('QuanHuyen Management Update Component', () => {
        let comp: QuanHuyenUpdateComponent;
        let fixture: ComponentFixture<QuanHuyenUpdateComponent>;
        let service: QuanHuyenService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [QuanHuyenUpdateComponent]
            })
                .overrideTemplate(QuanHuyenUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(QuanHuyenUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QuanHuyenService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new QuanHuyen(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.quanHuyen = entity;
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
                    const entity = new QuanHuyen();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.quanHuyen = entity;
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
