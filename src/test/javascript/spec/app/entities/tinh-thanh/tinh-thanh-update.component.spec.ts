/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { TinhThanhUpdateComponent } from 'app/entities/tinh-thanh/tinh-thanh-update.component';
import { TinhThanhService } from 'app/entities/tinh-thanh/tinh-thanh.service';
import { TinhThanh } from 'app/shared/model/tinh-thanh.model';

describe('Component Tests', () => {
    describe('TinhThanh Management Update Component', () => {
        let comp: TinhThanhUpdateComponent;
        let fixture: ComponentFixture<TinhThanhUpdateComponent>;
        let service: TinhThanhService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [TinhThanhUpdateComponent]
            })
                .overrideTemplate(TinhThanhUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TinhThanhUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TinhThanhService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TinhThanh(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.tinhThanh = entity;
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
                    const entity = new TinhThanh();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.tinhThanh = entity;
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
