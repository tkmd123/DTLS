/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DtlsTestModule } from '../../../test.module';
import { NhanVienComponent } from 'app/entities/nhan-vien/nhan-vien.component';
import { NhanVienService } from 'app/entities/nhan-vien/nhan-vien.service';
import { NhanVien } from 'app/shared/model/nhan-vien.model';

describe('Component Tests', () => {
    describe('NhanVien Management Component', () => {
        let comp: NhanVienComponent;
        let fixture: ComponentFixture<NhanVienComponent>;
        let service: NhanVienService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [NhanVienComponent],
                providers: []
            })
                .overrideTemplate(NhanVienComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(NhanVienComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NhanVienService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new NhanVien(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.nhanViens[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
