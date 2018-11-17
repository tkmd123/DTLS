/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DtlsTestModule } from '../../../test.module';
import { NhanDangLietSiComponent } from 'app/entities/nhan-dang-liet-si/nhan-dang-liet-si.component';
import { NhanDangLietSiService } from 'app/entities/nhan-dang-liet-si/nhan-dang-liet-si.service';
import { NhanDangLietSi } from 'app/shared/model/nhan-dang-liet-si.model';

describe('Component Tests', () => {
    describe('NhanDangLietSi Management Component', () => {
        let comp: NhanDangLietSiComponent;
        let fixture: ComponentFixture<NhanDangLietSiComponent>;
        let service: NhanDangLietSiService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [NhanDangLietSiComponent],
                providers: []
            })
                .overrideTemplate(NhanDangLietSiComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(NhanDangLietSiComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NhanDangLietSiService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new NhanDangLietSi(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.nhanDangLietSis[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
