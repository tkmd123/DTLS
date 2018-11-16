/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { QuanHeThanNhanUpdateComponent } from 'app/entities/quan-he-than-nhan/quan-he-than-nhan-update.component';
import { QuanHeThanNhanService } from 'app/entities/quan-he-than-nhan/quan-he-than-nhan.service';
import { QuanHeThanNhan } from 'app/shared/model/quan-he-than-nhan.model';

describe('Component Tests', () => {
    describe('QuanHeThanNhan Management Update Component', () => {
        let comp: QuanHeThanNhanUpdateComponent;
        let fixture: ComponentFixture<QuanHeThanNhanUpdateComponent>;
        let service: QuanHeThanNhanService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [QuanHeThanNhanUpdateComponent]
            })
                .overrideTemplate(QuanHeThanNhanUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(QuanHeThanNhanUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QuanHeThanNhanService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new QuanHeThanNhan(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.quanHeThanNhan = entity;
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
                    const entity = new QuanHeThanNhan();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.quanHeThanNhan = entity;
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
