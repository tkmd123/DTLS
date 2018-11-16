/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { ThongTinMoUpdateComponent } from 'app/entities/thong-tin-mo/thong-tin-mo-update.component';
import { ThongTinMoService } from 'app/entities/thong-tin-mo/thong-tin-mo.service';
import { ThongTinMo } from 'app/shared/model/thong-tin-mo.model';

describe('Component Tests', () => {
    describe('ThongTinMo Management Update Component', () => {
        let comp: ThongTinMoUpdateComponent;
        let fixture: ComponentFixture<ThongTinMoUpdateComponent>;
        let service: ThongTinMoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [ThongTinMoUpdateComponent]
            })
                .overrideTemplate(ThongTinMoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ThongTinMoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ThongTinMoService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ThongTinMo(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.thongTinMo = entity;
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
                    const entity = new ThongTinMo();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.thongTinMo = entity;
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
