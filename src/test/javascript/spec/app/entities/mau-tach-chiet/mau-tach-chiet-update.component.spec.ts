/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { MauTachChietUpdateComponent } from 'app/entities/mau-tach-chiet/mau-tach-chiet-update.component';
import { MauTachChietService } from 'app/entities/mau-tach-chiet/mau-tach-chiet.service';
import { MauTachChiet } from 'app/shared/model/mau-tach-chiet.model';

describe('Component Tests', () => {
    describe('MauTachChiet Management Update Component', () => {
        let comp: MauTachChietUpdateComponent;
        let fixture: ComponentFixture<MauTachChietUpdateComponent>;
        let service: MauTachChietService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [MauTachChietUpdateComponent]
            })
                .overrideTemplate(MauTachChietUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MauTachChietUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MauTachChietService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new MauTachChiet(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.mauTachChiet = entity;
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
                    const entity = new MauTachChiet();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.mauTachChiet = entity;
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
