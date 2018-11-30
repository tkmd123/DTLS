/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { PCRPhanUngChuanUpdateComponent } from 'app/entities/pcr-phan-ung-chuan/pcr-phan-ung-chuan-update.component';
import { PCRPhanUngChuanService } from 'app/entities/pcr-phan-ung-chuan/pcr-phan-ung-chuan.service';
import { PCRPhanUngChuan } from 'app/shared/model/pcr-phan-ung-chuan.model';

describe('Component Tests', () => {
    describe('PCRPhanUngChuan Management Update Component', () => {
        let comp: PCRPhanUngChuanUpdateComponent;
        let fixture: ComponentFixture<PCRPhanUngChuanUpdateComponent>;
        let service: PCRPhanUngChuanService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [PCRPhanUngChuanUpdateComponent]
            })
                .overrideTemplate(PCRPhanUngChuanUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PCRPhanUngChuanUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PCRPhanUngChuanService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PCRPhanUngChuan(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.pCRPhanUngChuan = entity;
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
                    const entity = new PCRPhanUngChuan();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.pCRPhanUngChuan = entity;
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
