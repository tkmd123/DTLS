/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DtlsTestModule } from '../../../test.module';
import { HoSoGiamDinhComponent } from 'app/entities/ho-so-giam-dinh/ho-so-giam-dinh.component';
import { HoSoGiamDinhService } from 'app/entities/ho-so-giam-dinh/ho-so-giam-dinh.service';
import { HoSoGiamDinh } from 'app/shared/model/ho-so-giam-dinh.model';

describe('Component Tests', () => {
    describe('HoSoGiamDinh Management Component', () => {
        let comp: HoSoGiamDinhComponent;
        let fixture: ComponentFixture<HoSoGiamDinhComponent>;
        let service: HoSoGiamDinhService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [HoSoGiamDinhComponent],
                providers: []
            })
                .overrideTemplate(HoSoGiamDinhComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(HoSoGiamDinhComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HoSoGiamDinhService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new HoSoGiamDinh(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.hoSoGiamDinhs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
