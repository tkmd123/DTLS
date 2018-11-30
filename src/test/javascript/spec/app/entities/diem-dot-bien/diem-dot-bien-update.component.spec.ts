/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { DiemDotBienUpdateComponent } from 'app/entities/diem-dot-bien/diem-dot-bien-update.component';
import { DiemDotBienService } from 'app/entities/diem-dot-bien/diem-dot-bien.service';
import { DiemDotBien } from 'app/shared/model/diem-dot-bien.model';

describe('Component Tests', () => {
    describe('DiemDotBien Management Update Component', () => {
        let comp: DiemDotBienUpdateComponent;
        let fixture: ComponentFixture<DiemDotBienUpdateComponent>;
        let service: DiemDotBienService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [DiemDotBienUpdateComponent]
            })
                .overrideTemplate(DiemDotBienUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DiemDotBienUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DiemDotBienService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new DiemDotBien(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.diemDotBien = entity;
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
                    const entity = new DiemDotBien();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.diemDotBien = entity;
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
