/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { DonViThoiKyUpdateComponent } from 'app/entities/don-vi-thoi-ky/don-vi-thoi-ky-update.component';
import { DonViThoiKyService } from 'app/entities/don-vi-thoi-ky/don-vi-thoi-ky.service';
import { DonViThoiKy } from 'app/shared/model/don-vi-thoi-ky.model';

describe('Component Tests', () => {
    describe('DonViThoiKy Management Update Component', () => {
        let comp: DonViThoiKyUpdateComponent;
        let fixture: ComponentFixture<DonViThoiKyUpdateComponent>;
        let service: DonViThoiKyService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [DonViThoiKyUpdateComponent]
            })
                .overrideTemplate(DonViThoiKyUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DonViThoiKyUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DonViThoiKyService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new DonViThoiKy(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.donViThoiKy = entity;
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
                    const entity = new DonViThoiKy();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.donViThoiKy = entity;
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
