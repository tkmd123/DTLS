/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { HoSoLietSiUpdateComponent } from 'app/entities/ho-so-liet-si/ho-so-liet-si-update.component';
import { HoSoLietSiService } from 'app/entities/ho-so-liet-si/ho-so-liet-si.service';
import { HoSoLietSi } from 'app/shared/model/ho-so-liet-si.model';

describe('Component Tests', () => {
    describe('HoSoLietSi Management Update Component', () => {
        let comp: HoSoLietSiUpdateComponent;
        let fixture: ComponentFixture<HoSoLietSiUpdateComponent>;
        let service: HoSoLietSiService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [HoSoLietSiUpdateComponent]
            })
                .overrideTemplate(HoSoLietSiUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(HoSoLietSiUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HoSoLietSiService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new HoSoLietSi(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.hoSoLietSi = entity;
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
                    const entity = new HoSoLietSi();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.hoSoLietSi = entity;
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
