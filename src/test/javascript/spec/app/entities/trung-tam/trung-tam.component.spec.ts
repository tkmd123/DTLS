/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DtlsTestModule } from '../../../test.module';
import { TrungTamComponent } from 'app/entities/trung-tam/trung-tam.component';
import { TrungTamService } from 'app/entities/trung-tam/trung-tam.service';
import { TrungTam } from 'app/shared/model/trung-tam.model';

describe('Component Tests', () => {
    describe('TrungTam Management Component', () => {
        let comp: TrungTamComponent;
        let fixture: ComponentFixture<TrungTamComponent>;
        let service: TrungTamService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [TrungTamComponent],
                providers: []
            })
                .overrideTemplate(TrungTamComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TrungTamComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TrungTamService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TrungTam(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.trungTams[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
