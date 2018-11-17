/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { DiVatUpdateComponent } from 'app/entities/di-vat/di-vat-update.component';
import { DiVatService } from 'app/entities/di-vat/di-vat.service';
import { DiVat } from 'app/shared/model/di-vat.model';

describe('Component Tests', () => {
    describe('DiVat Management Update Component', () => {
        let comp: DiVatUpdateComponent;
        let fixture: ComponentFixture<DiVatUpdateComponent>;
        let service: DiVatService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [DiVatUpdateComponent]
            })
                .overrideTemplate(DiVatUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DiVatUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DiVatService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new DiVat(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.diVat = entity;
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
                    const entity = new DiVat();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.diVat = entity;
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
