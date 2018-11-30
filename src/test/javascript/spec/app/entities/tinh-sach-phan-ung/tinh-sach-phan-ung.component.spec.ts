/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DtlsTestModule } from '../../../test.module';
import { TinhSachPhanUngComponent } from 'app/entities/tinh-sach-phan-ung/tinh-sach-phan-ung.component';
import { TinhSachPhanUngService } from 'app/entities/tinh-sach-phan-ung/tinh-sach-phan-ung.service';
import { TinhSachPhanUng } from 'app/shared/model/tinh-sach-phan-ung.model';

describe('Component Tests', () => {
    describe('TinhSachPhanUng Management Component', () => {
        let comp: TinhSachPhanUngComponent;
        let fixture: ComponentFixture<TinhSachPhanUngComponent>;
        let service: TinhSachPhanUngService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [TinhSachPhanUngComponent],
                providers: []
            })
                .overrideTemplate(TinhSachPhanUngComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TinhSachPhanUngComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TinhSachPhanUngService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TinhSachPhanUng(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.tinhSachPhanUngs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
