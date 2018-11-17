/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { ChucVuUpdateComponent } from 'app/entities/chuc-vu/chuc-vu-update.component';
import { ChucVuService } from 'app/entities/chuc-vu/chuc-vu.service';
import { ChucVu } from 'app/shared/model/chuc-vu.model';

describe('Component Tests', () => {
    describe('ChucVu Management Update Component', () => {
        let comp: ChucVuUpdateComponent;
        let fixture: ComponentFixture<ChucVuUpdateComponent>;
        let service: ChucVuService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [ChucVuUpdateComponent]
            })
                .overrideTemplate(ChucVuUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ChucVuUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChucVuService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ChucVu(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.chucVu = entity;
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
                    const entity = new ChucVu();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.chucVu = entity;
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
