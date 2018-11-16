/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { HaiCotLietSiUpdateComponent } from 'app/entities/hai-cot-liet-si/hai-cot-liet-si-update.component';
import { HaiCotLietSiService } from 'app/entities/hai-cot-liet-si/hai-cot-liet-si.service';
import { HaiCotLietSi } from 'app/shared/model/hai-cot-liet-si.model';

describe('Component Tests', () => {
    describe('HaiCotLietSi Management Update Component', () => {
        let comp: HaiCotLietSiUpdateComponent;
        let fixture: ComponentFixture<HaiCotLietSiUpdateComponent>;
        let service: HaiCotLietSiService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [HaiCotLietSiUpdateComponent]
            })
                .overrideTemplate(HaiCotLietSiUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(HaiCotLietSiUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HaiCotLietSiService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new HaiCotLietSi(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.haiCotLietSi = entity;
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
                    const entity = new HaiCotLietSi();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.haiCotLietSi = entity;
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
