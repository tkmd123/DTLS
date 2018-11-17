/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { MauXetNghiemUpdateComponent } from 'app/entities/mau-xet-nghiem/mau-xet-nghiem-update.component';
import { MauXetNghiemService } from 'app/entities/mau-xet-nghiem/mau-xet-nghiem.service';
import { MauXetNghiem } from 'app/shared/model/mau-xet-nghiem.model';

describe('Component Tests', () => {
    describe('MauXetNghiem Management Update Component', () => {
        let comp: MauXetNghiemUpdateComponent;
        let fixture: ComponentFixture<MauXetNghiemUpdateComponent>;
        let service: MauXetNghiemService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [MauXetNghiemUpdateComponent]
            })
                .overrideTemplate(MauXetNghiemUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MauXetNghiemUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MauXetNghiemService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new MauXetNghiem(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.mauXetNghiem = entity;
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
                    const entity = new MauXetNghiem();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.mauXetNghiem = entity;
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
