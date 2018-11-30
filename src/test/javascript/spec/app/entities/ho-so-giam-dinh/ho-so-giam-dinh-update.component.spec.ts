/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { HoSoGiamDinhUpdateComponent } from 'app/entities/ho-so-giam-dinh/ho-so-giam-dinh-update.component';
import { HoSoGiamDinhService } from 'app/entities/ho-so-giam-dinh/ho-so-giam-dinh.service';
import { HoSoGiamDinh } from 'app/shared/model/ho-so-giam-dinh.model';

describe('Component Tests', () => {
    describe('HoSoGiamDinh Management Update Component', () => {
        let comp: HoSoGiamDinhUpdateComponent;
        let fixture: ComponentFixture<HoSoGiamDinhUpdateComponent>;
        let service: HoSoGiamDinhService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [HoSoGiamDinhUpdateComponent]
            })
                .overrideTemplate(HoSoGiamDinhUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(HoSoGiamDinhUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HoSoGiamDinhService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new HoSoGiamDinh(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.hoSoGiamDinh = entity;
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
                    const entity = new HoSoGiamDinh();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.hoSoGiamDinh = entity;
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
