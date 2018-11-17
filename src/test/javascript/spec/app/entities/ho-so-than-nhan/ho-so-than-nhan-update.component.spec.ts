/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { HoSoThanNhanUpdateComponent } from 'app/entities/ho-so-than-nhan/ho-so-than-nhan-update.component';
import { HoSoThanNhanService } from 'app/entities/ho-so-than-nhan/ho-so-than-nhan.service';
import { HoSoThanNhan } from 'app/shared/model/ho-so-than-nhan.model';

describe('Component Tests', () => {
    describe('HoSoThanNhan Management Update Component', () => {
        let comp: HoSoThanNhanUpdateComponent;
        let fixture: ComponentFixture<HoSoThanNhanUpdateComponent>;
        let service: HoSoThanNhanService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [HoSoThanNhanUpdateComponent]
            })
                .overrideTemplate(HoSoThanNhanUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(HoSoThanNhanUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HoSoThanNhanService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new HoSoThanNhan(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.hoSoThanNhan = entity;
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
                    const entity = new HoSoThanNhan();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.hoSoThanNhan = entity;
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
