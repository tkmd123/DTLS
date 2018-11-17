/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DtlsTestModule } from '../../../test.module';
import { CapBacComponent } from 'app/entities/cap-bac/cap-bac.component';
import { CapBacService } from 'app/entities/cap-bac/cap-bac.service';
import { CapBac } from 'app/shared/model/cap-bac.model';

describe('Component Tests', () => {
    describe('CapBac Management Component', () => {
        let comp: CapBacComponent;
        let fixture: ComponentFixture<CapBacComponent>;
        let service: CapBacService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [CapBacComponent],
                providers: []
            })
                .overrideTemplate(CapBacComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CapBacComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CapBacService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new CapBac(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.capBacs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
