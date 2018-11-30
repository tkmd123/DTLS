/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { PCRKetQuaUpdateComponent } from 'app/entities/pcr-ket-qua/pcr-ket-qua-update.component';
import { PCRKetQuaService } from 'app/entities/pcr-ket-qua/pcr-ket-qua.service';
import { PCRKetQua } from 'app/shared/model/pcr-ket-qua.model';

describe('Component Tests', () => {
    describe('PCRKetQua Management Update Component', () => {
        let comp: PCRKetQuaUpdateComponent;
        let fixture: ComponentFixture<PCRKetQuaUpdateComponent>;
        let service: PCRKetQuaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [PCRKetQuaUpdateComponent]
            })
                .overrideTemplate(PCRKetQuaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PCRKetQuaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PCRKetQuaService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PCRKetQua(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.pCRKetQua = entity;
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
                    const entity = new PCRKetQua();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.pCRKetQua = entity;
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
