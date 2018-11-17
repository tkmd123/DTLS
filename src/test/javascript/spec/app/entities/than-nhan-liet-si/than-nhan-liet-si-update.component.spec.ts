/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { ThanNhanLietSiUpdateComponent } from 'app/entities/than-nhan-liet-si/than-nhan-liet-si-update.component';
import { ThanNhanLietSiService } from 'app/entities/than-nhan-liet-si/than-nhan-liet-si.service';
import { ThanNhanLietSi } from 'app/shared/model/than-nhan-liet-si.model';

describe('Component Tests', () => {
    describe('ThanNhanLietSi Management Update Component', () => {
        let comp: ThanNhanLietSiUpdateComponent;
        let fixture: ComponentFixture<ThanNhanLietSiUpdateComponent>;
        let service: ThanNhanLietSiService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [ThanNhanLietSiUpdateComponent]
            })
                .overrideTemplate(ThanNhanLietSiUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ThanNhanLietSiUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ThanNhanLietSiService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ThanNhanLietSi(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.thanNhanLietSi = entity;
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
                    const entity = new ThanNhanLietSi();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.thanNhanLietSi = entity;
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
