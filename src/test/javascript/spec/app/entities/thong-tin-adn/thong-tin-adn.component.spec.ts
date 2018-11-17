/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DtlsTestModule } from '../../../test.module';
import { ThongTinADNComponent } from 'app/entities/thong-tin-adn/thong-tin-adn.component';
import { ThongTinADNService } from 'app/entities/thong-tin-adn/thong-tin-adn.service';
import { ThongTinADN } from 'app/shared/model/thong-tin-adn.model';

describe('Component Tests', () => {
    describe('ThongTinADN Management Component', () => {
        let comp: ThongTinADNComponent;
        let fixture: ComponentFixture<ThongTinADNComponent>;
        let service: ThongTinADNService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [ThongTinADNComponent],
                providers: []
            })
                .overrideTemplate(ThongTinADNComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ThongTinADNComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ThongTinADNService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ThongTinADN(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.thongTinADNS[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
