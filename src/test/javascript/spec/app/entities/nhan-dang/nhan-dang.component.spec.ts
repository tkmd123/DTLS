/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DtlsTestModule } from '../../../test.module';
import { NhanDangComponent } from 'app/entities/nhan-dang/nhan-dang.component';
import { NhanDangService } from 'app/entities/nhan-dang/nhan-dang.service';
import { NhanDang } from 'app/shared/model/nhan-dang.model';

describe('Component Tests', () => {
    describe('NhanDang Management Component', () => {
        let comp: NhanDangComponent;
        let fixture: ComponentFixture<NhanDangComponent>;
        let service: NhanDangService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [NhanDangComponent],
                providers: []
            })
                .overrideTemplate(NhanDangComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(NhanDangComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NhanDangService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new NhanDang(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.nhanDangs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
