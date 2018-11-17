/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { LoaiThaoTacUpdateComponent } from 'app/entities/loai-thao-tac/loai-thao-tac-update.component';
import { LoaiThaoTacService } from 'app/entities/loai-thao-tac/loai-thao-tac.service';
import { LoaiThaoTac } from 'app/shared/model/loai-thao-tac.model';

describe('Component Tests', () => {
    describe('LoaiThaoTac Management Update Component', () => {
        let comp: LoaiThaoTacUpdateComponent;
        let fixture: ComponentFixture<LoaiThaoTacUpdateComponent>;
        let service: LoaiThaoTacService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [LoaiThaoTacUpdateComponent]
            })
                .overrideTemplate(LoaiThaoTacUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LoaiThaoTacUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LoaiThaoTacService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new LoaiThaoTac(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.loaiThaoTac = entity;
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
                    const entity = new LoaiThaoTac();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.loaiThaoTac = entity;
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
