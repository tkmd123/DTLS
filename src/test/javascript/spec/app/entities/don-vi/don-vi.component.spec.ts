/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DtlsTestModule } from '../../../test.module';
import { DonViComponent } from 'app/entities/don-vi/don-vi.component';
import { DonViService } from 'app/entities/don-vi/don-vi.service';
import { DonVi } from 'app/shared/model/don-vi.model';

describe('Component Tests', () => {
    describe('DonVi Management Component', () => {
        let comp: DonViComponent;
        let fixture: ComponentFixture<DonViComponent>;
        let service: DonViService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [DonViComponent],
                providers: []
            })
                .overrideTemplate(DonViComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DonViComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DonViService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new DonVi(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.donVis[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
