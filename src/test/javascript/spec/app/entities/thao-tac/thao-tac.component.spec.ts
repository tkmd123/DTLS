/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DtlsTestModule } from '../../../test.module';
import { ThaoTacComponent } from 'app/entities/thao-tac/thao-tac.component';
import { ThaoTacService } from 'app/entities/thao-tac/thao-tac.service';
import { ThaoTac } from 'app/shared/model/thao-tac.model';

describe('Component Tests', () => {
    describe('ThaoTac Management Component', () => {
        let comp: ThaoTacComponent;
        let fixture: ComponentFixture<ThaoTacComponent>;
        let service: ThaoTacService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [ThaoTacComponent],
                providers: []
            })
                .overrideTemplate(ThaoTacComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ThaoTacComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ThaoTacService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ThaoTac(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.thaoTacs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
