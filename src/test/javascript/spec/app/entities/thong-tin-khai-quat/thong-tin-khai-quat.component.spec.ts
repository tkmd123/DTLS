/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DtlsTestModule } from '../../../test.module';
import { ThongTinKhaiQuatComponent } from 'app/entities/thong-tin-khai-quat/thong-tin-khai-quat.component';
import { ThongTinKhaiQuatService } from 'app/entities/thong-tin-khai-quat/thong-tin-khai-quat.service';
import { ThongTinKhaiQuat } from 'app/shared/model/thong-tin-khai-quat.model';

describe('Component Tests', () => {
    describe('ThongTinKhaiQuat Management Component', () => {
        let comp: ThongTinKhaiQuatComponent;
        let fixture: ComponentFixture<ThongTinKhaiQuatComponent>;
        let service: ThongTinKhaiQuatService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [ThongTinKhaiQuatComponent],
                providers: []
            })
                .overrideTemplate(ThongTinKhaiQuatComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ThongTinKhaiQuatComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ThongTinKhaiQuatService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ThongTinKhaiQuat(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.thongTinKhaiQuats[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
