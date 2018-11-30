/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { HoaChatTachChietUpdateComponent } from 'app/entities/hoa-chat-tach-chiet/hoa-chat-tach-chiet-update.component';
import { HoaChatTachChietService } from 'app/entities/hoa-chat-tach-chiet/hoa-chat-tach-chiet.service';
import { HoaChatTachChiet } from 'app/shared/model/hoa-chat-tach-chiet.model';

describe('Component Tests', () => {
    describe('HoaChatTachChiet Management Update Component', () => {
        let comp: HoaChatTachChietUpdateComponent;
        let fixture: ComponentFixture<HoaChatTachChietUpdateComponent>;
        let service: HoaChatTachChietService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [HoaChatTachChietUpdateComponent]
            })
                .overrideTemplate(HoaChatTachChietUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(HoaChatTachChietUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HoaChatTachChietService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new HoaChatTachChiet(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.hoaChatTachChiet = entity;
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
                    const entity = new HoaChatTachChiet();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.hoaChatTachChiet = entity;
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
