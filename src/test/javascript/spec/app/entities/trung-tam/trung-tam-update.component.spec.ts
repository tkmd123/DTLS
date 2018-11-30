/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { TrungTamUpdateComponent } from 'app/entities/trung-tam/trung-tam-update.component';
import { TrungTamService } from 'app/entities/trung-tam/trung-tam.service';
import { TrungTam } from 'app/shared/model/trung-tam.model';

describe('Component Tests', () => {
    describe('TrungTam Management Update Component', () => {
        let comp: TrungTamUpdateComponent;
        let fixture: ComponentFixture<TrungTamUpdateComponent>;
        let service: TrungTamService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [TrungTamUpdateComponent]
            })
                .overrideTemplate(TrungTamUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TrungTamUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TrungTamService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TrungTam(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.trungTam = entity;
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
                    const entity = new TrungTam();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.trungTam = entity;
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
