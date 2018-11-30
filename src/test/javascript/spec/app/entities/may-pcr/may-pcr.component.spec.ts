/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DtlsTestModule } from '../../../test.module';
import { MayPCRComponent } from 'app/entities/may-pcr/may-pcr.component';
import { MayPCRService } from 'app/entities/may-pcr/may-pcr.service';
import { MayPCR } from 'app/shared/model/may-pcr.model';

describe('Component Tests', () => {
    describe('MayPCR Management Component', () => {
        let comp: MayPCRComponent;
        let fixture: ComponentFixture<MayPCRComponent>;
        let service: MayPCRService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [MayPCRComponent],
                providers: []
            })
                .overrideTemplate(MayPCRComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MayPCRComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MayPCRService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new MayPCR(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.mayPCRS[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
