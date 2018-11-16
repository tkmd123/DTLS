/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DtlsTestModule } from '../../../test.module';
import { HaiCotLietSiComponent } from 'app/entities/hai-cot-liet-si/hai-cot-liet-si.component';
import { HaiCotLietSiService } from 'app/entities/hai-cot-liet-si/hai-cot-liet-si.service';
import { HaiCotLietSi } from 'app/shared/model/hai-cot-liet-si.model';

describe('Component Tests', () => {
    describe('HaiCotLietSi Management Component', () => {
        let comp: HaiCotLietSiComponent;
        let fixture: ComponentFixture<HaiCotLietSiComponent>;
        let service: HaiCotLietSiService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [HaiCotLietSiComponent],
                providers: []
            })
                .overrideTemplate(HaiCotLietSiComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(HaiCotLietSiComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HaiCotLietSiService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new HaiCotLietSi(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.haiCotLietSis[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
