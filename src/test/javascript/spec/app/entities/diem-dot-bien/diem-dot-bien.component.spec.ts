/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DtlsTestModule } from '../../../test.module';
import { DiemDotBienComponent } from 'app/entities/diem-dot-bien/diem-dot-bien.component';
import { DiemDotBienService } from 'app/entities/diem-dot-bien/diem-dot-bien.service';
import { DiemDotBien } from 'app/shared/model/diem-dot-bien.model';

describe('Component Tests', () => {
    describe('DiemDotBien Management Component', () => {
        let comp: DiemDotBienComponent;
        let fixture: ComponentFixture<DiemDotBienComponent>;
        let service: DiemDotBienService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [DiemDotBienComponent],
                providers: []
            })
                .overrideTemplate(DiemDotBienComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DiemDotBienComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DiemDotBienService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new DiemDotBien(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.diemDotBiens[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
