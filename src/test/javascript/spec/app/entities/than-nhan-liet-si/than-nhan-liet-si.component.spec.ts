/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DtlsTestModule } from '../../../test.module';
import { ThanNhanLietSiComponent } from 'app/entities/than-nhan-liet-si/than-nhan-liet-si.component';
import { ThanNhanLietSiService } from 'app/entities/than-nhan-liet-si/than-nhan-liet-si.service';
import { ThanNhanLietSi } from 'app/shared/model/than-nhan-liet-si.model';

describe('Component Tests', () => {
    describe('ThanNhanLietSi Management Component', () => {
        let comp: ThanNhanLietSiComponent;
        let fixture: ComponentFixture<ThanNhanLietSiComponent>;
        let service: ThanNhanLietSiService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [ThanNhanLietSiComponent],
                providers: []
            })
                .overrideTemplate(ThanNhanLietSiComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ThanNhanLietSiComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ThanNhanLietSiService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ThanNhanLietSi(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.thanNhanLietSis[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
