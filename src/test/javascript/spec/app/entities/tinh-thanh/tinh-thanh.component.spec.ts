/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DtlsTestModule } from '../../../test.module';
import { TinhThanhComponent } from 'app/entities/tinh-thanh/tinh-thanh.component';
import { TinhThanhService } from 'app/entities/tinh-thanh/tinh-thanh.service';
import { TinhThanh } from 'app/shared/model/tinh-thanh.model';

describe('Component Tests', () => {
    describe('TinhThanh Management Component', () => {
        let comp: TinhThanhComponent;
        let fixture: ComponentFixture<TinhThanhComponent>;
        let service: TinhThanhService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [TinhThanhComponent],
                providers: []
            })
                .overrideTemplate(TinhThanhComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TinhThanhComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TinhThanhService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TinhThanh(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.tinhThanhs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
