/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { PhuongXaUpdateComponent } from 'app/entities/phuong-xa/phuong-xa-update.component';
import { PhuongXaService } from 'app/entities/phuong-xa/phuong-xa.service';
import { PhuongXa } from 'app/shared/model/phuong-xa.model';

describe('Component Tests', () => {
    describe('PhuongXa Management Update Component', () => {
        let comp: PhuongXaUpdateComponent;
        let fixture: ComponentFixture<PhuongXaUpdateComponent>;
        let service: PhuongXaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [PhuongXaUpdateComponent]
            })
                .overrideTemplate(PhuongXaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PhuongXaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PhuongXaService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PhuongXa(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.phuongXa = entity;
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
                    const entity = new PhuongXa();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.phuongXa = entity;
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
