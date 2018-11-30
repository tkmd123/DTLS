/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { HoaChatUpdateComponent } from 'app/entities/hoa-chat/hoa-chat-update.component';
import { HoaChatService } from 'app/entities/hoa-chat/hoa-chat.service';
import { HoaChat } from 'app/shared/model/hoa-chat.model';

describe('Component Tests', () => {
    describe('HoaChat Management Update Component', () => {
        let comp: HoaChatUpdateComponent;
        let fixture: ComponentFixture<HoaChatUpdateComponent>;
        let service: HoaChatService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [HoaChatUpdateComponent]
            })
                .overrideTemplate(HoaChatUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(HoaChatUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HoaChatService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new HoaChat(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.hoaChat = entity;
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
                    const entity = new HoaChat();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.hoaChat = entity;
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
