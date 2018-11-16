/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DtlsTestModule } from '../../../test.module';
import { HinhThaiHaiCotComponent } from 'app/entities/hinh-thai-hai-cot/hinh-thai-hai-cot.component';
import { HinhThaiHaiCotService } from 'app/entities/hinh-thai-hai-cot/hinh-thai-hai-cot.service';
import { HinhThaiHaiCot } from 'app/shared/model/hinh-thai-hai-cot.model';

describe('Component Tests', () => {
    describe('HinhThaiHaiCot Management Component', () => {
        let comp: HinhThaiHaiCotComponent;
        let fixture: ComponentFixture<HinhThaiHaiCotComponent>;
        let service: HinhThaiHaiCotService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [HinhThaiHaiCotComponent],
                providers: []
            })
                .overrideTemplate(HinhThaiHaiCotComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(HinhThaiHaiCotComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HinhThaiHaiCotService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new HinhThaiHaiCot(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.hinhThaiHaiCots[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
