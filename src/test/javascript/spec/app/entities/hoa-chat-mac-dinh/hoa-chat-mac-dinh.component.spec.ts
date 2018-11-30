/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DtlsTestModule } from '../../../test.module';
import { HoaChatMacDinhComponent } from 'app/entities/hoa-chat-mac-dinh/hoa-chat-mac-dinh.component';
import { HoaChatMacDinhService } from 'app/entities/hoa-chat-mac-dinh/hoa-chat-mac-dinh.service';
import { HoaChatMacDinh } from 'app/shared/model/hoa-chat-mac-dinh.model';

describe('Component Tests', () => {
    describe('HoaChatMacDinh Management Component', () => {
        let comp: HoaChatMacDinhComponent;
        let fixture: ComponentFixture<HoaChatMacDinhComponent>;
        let service: HoaChatMacDinhService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [HoaChatMacDinhComponent],
                providers: []
            })
                .overrideTemplate(HoaChatMacDinhComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(HoaChatMacDinhComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HoaChatMacDinhService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new HoaChatMacDinh(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.hoaChatMacDinhs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
