/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DtlsTestModule } from '../../../test.module';
import { PCRPhanUngChuanComponent } from 'app/entities/pcr-phan-ung-chuan/pcr-phan-ung-chuan.component';
import { PCRPhanUngChuanService } from 'app/entities/pcr-phan-ung-chuan/pcr-phan-ung-chuan.service';
import { PCRPhanUngChuan } from 'app/shared/model/pcr-phan-ung-chuan.model';

describe('Component Tests', () => {
    describe('PCRPhanUngChuan Management Component', () => {
        let comp: PCRPhanUngChuanComponent;
        let fixture: ComponentFixture<PCRPhanUngChuanComponent>;
        let service: PCRPhanUngChuanService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [PCRPhanUngChuanComponent],
                providers: []
            })
                .overrideTemplate(PCRPhanUngChuanComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PCRPhanUngChuanComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PCRPhanUngChuanService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new PCRPhanUngChuan(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.pCRPhanUngChuans[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
