/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DtlsTestModule } from '../../../test.module';
import { HoaChatComponent } from 'app/entities/hoa-chat/hoa-chat.component';
import { HoaChatService } from 'app/entities/hoa-chat/hoa-chat.service';
import { HoaChat } from 'app/shared/model/hoa-chat.model';

describe('Component Tests', () => {
    describe('HoaChat Management Component', () => {
        let comp: HoaChatComponent;
        let fixture: ComponentFixture<HoaChatComponent>;
        let service: HoaChatService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [HoaChatComponent],
                providers: []
            })
                .overrideTemplate(HoaChatComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(HoaChatComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HoaChatService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new HoaChat(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.hoaChats[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
