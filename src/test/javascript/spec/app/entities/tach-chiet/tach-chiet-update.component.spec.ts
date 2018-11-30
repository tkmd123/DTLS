/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { TachChietUpdateComponent } from 'app/entities/tach-chiet/tach-chiet-update.component';
import { TachChietService } from 'app/entities/tach-chiet/tach-chiet.service';
import { TachChiet } from 'app/shared/model/tach-chiet.model';

describe('Component Tests', () => {
    describe('TachChiet Management Update Component', () => {
        let comp: TachChietUpdateComponent;
        let fixture: ComponentFixture<TachChietUpdateComponent>;
        let service: TachChietService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [TachChietUpdateComponent]
            })
                .overrideTemplate(TachChietUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TachChietUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TachChietService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TachChiet(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.tachChiet = entity;
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
                    const entity = new TachChiet();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.tachChiet = entity;
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
