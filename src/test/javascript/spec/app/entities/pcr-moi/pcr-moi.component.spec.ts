/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DtlsTestModule } from '../../../test.module';
import { PCRMoiComponent } from 'app/entities/pcr-moi/pcr-moi.component';
import { PCRMoiService } from 'app/entities/pcr-moi/pcr-moi.service';
import { PCRMoi } from 'app/shared/model/pcr-moi.model';

describe('Component Tests', () => {
    describe('PCRMoi Management Component', () => {
        let comp: PCRMoiComponent;
        let fixture: ComponentFixture<PCRMoiComponent>;
        let service: PCRMoiService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [PCRMoiComponent],
                providers: []
            })
                .overrideTemplate(PCRMoiComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PCRMoiComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PCRMoiService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new PCRMoi(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.pCRMois[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
