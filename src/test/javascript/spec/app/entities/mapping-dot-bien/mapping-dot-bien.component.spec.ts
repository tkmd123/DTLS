/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DtlsTestModule } from '../../../test.module';
import { MappingDotBienComponent } from 'app/entities/mapping-dot-bien/mapping-dot-bien.component';
import { MappingDotBienService } from 'app/entities/mapping-dot-bien/mapping-dot-bien.service';
import { MappingDotBien } from 'app/shared/model/mapping-dot-bien.model';

describe('Component Tests', () => {
    describe('MappingDotBien Management Component', () => {
        let comp: MappingDotBienComponent;
        let fixture: ComponentFixture<MappingDotBienComponent>;
        let service: MappingDotBienService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [MappingDotBienComponent],
                providers: []
            })
                .overrideTemplate(MappingDotBienComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MappingDotBienComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MappingDotBienService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new MappingDotBien(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.mappingDotBiens[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
