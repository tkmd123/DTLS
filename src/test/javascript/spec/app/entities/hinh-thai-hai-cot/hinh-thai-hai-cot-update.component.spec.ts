/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { HinhThaiHaiCotUpdateComponent } from 'app/entities/hinh-thai-hai-cot/hinh-thai-hai-cot-update.component';
import { HinhThaiHaiCotService } from 'app/entities/hinh-thai-hai-cot/hinh-thai-hai-cot.service';
import { HinhThaiHaiCot } from 'app/shared/model/hinh-thai-hai-cot.model';

describe('Component Tests', () => {
    describe('HinhThaiHaiCot Management Update Component', () => {
        let comp: HinhThaiHaiCotUpdateComponent;
        let fixture: ComponentFixture<HinhThaiHaiCotUpdateComponent>;
        let service: HinhThaiHaiCotService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [HinhThaiHaiCotUpdateComponent]
            })
                .overrideTemplate(HinhThaiHaiCotUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(HinhThaiHaiCotUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HinhThaiHaiCotService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new HinhThaiHaiCot(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.hinhThaiHaiCot = entity;
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
                    const entity = new HinhThaiHaiCot();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.hinhThaiHaiCot = entity;
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
