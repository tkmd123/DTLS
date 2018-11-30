/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DtlsTestModule } from '../../../test.module';
import { HoaChatTachChietComponent } from 'app/entities/hoa-chat-tach-chiet/hoa-chat-tach-chiet.component';
import { HoaChatTachChietService } from 'app/entities/hoa-chat-tach-chiet/hoa-chat-tach-chiet.service';
import { HoaChatTachChiet } from 'app/shared/model/hoa-chat-tach-chiet.model';

describe('Component Tests', () => {
    describe('HoaChatTachChiet Management Component', () => {
        let comp: HoaChatTachChietComponent;
        let fixture: ComponentFixture<HoaChatTachChietComponent>;
        let service: HoaChatTachChietService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [HoaChatTachChietComponent],
                providers: []
            })
                .overrideTemplate(HoaChatTachChietComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(HoaChatTachChietComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HoaChatTachChietService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new HoaChatTachChiet(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.hoaChatTachChiets[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
