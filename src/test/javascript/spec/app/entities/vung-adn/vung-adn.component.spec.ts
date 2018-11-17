/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DtlsTestModule } from '../../../test.module';
import { VungADNComponent } from 'app/entities/vung-adn/vung-adn.component';
import { VungADNService } from 'app/entities/vung-adn/vung-adn.service';
import { VungADN } from 'app/shared/model/vung-adn.model';

describe('Component Tests', () => {
    describe('VungADN Management Component', () => {
        let comp: VungADNComponent;
        let fixture: ComponentFixture<VungADNComponent>;
        let service: VungADNService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [VungADNComponent],
                providers: []
            })
                .overrideTemplate(VungADNComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(VungADNComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VungADNService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new VungADN(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.vungADNS[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
