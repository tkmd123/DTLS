/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DtlsTestModule } from '../../../test.module';
import { HoaChatDetailComponent } from 'app/entities/hoa-chat/hoa-chat-detail.component';
import { HoaChat } from 'app/shared/model/hoa-chat.model';

describe('Component Tests', () => {
    describe('HoaChat Management Detail Component', () => {
        let comp: HoaChatDetailComponent;
        let fixture: ComponentFixture<HoaChatDetailComponent>;
        const route = ({ data: of({ hoaChat: new HoaChat(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [HoaChatDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(HoaChatDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(HoaChatDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.hoaChat).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
