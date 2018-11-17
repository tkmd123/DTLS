/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { ThaoTacUpdateComponent } from 'app/entities/thao-tac/thao-tac-update.component';
import { ThaoTacService } from 'app/entities/thao-tac/thao-tac.service';
import { ThaoTac } from 'app/shared/model/thao-tac.model';

describe('Component Tests', () => {
    describe('ThaoTac Management Update Component', () => {
        let comp: ThaoTacUpdateComponent;
        let fixture: ComponentFixture<ThaoTacUpdateComponent>;
        let service: ThaoTacService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [ThaoTacUpdateComponent]
            })
                .overrideTemplate(ThaoTacUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ThaoTacUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ThaoTacService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ThaoTac(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.thaoTac = entity;
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
                    const entity = new ThaoTac();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.thaoTac = entity;
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
