/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DtlsTestModule } from '../../../test.module';
import { ThongTinMoComponent } from 'app/entities/thong-tin-mo/thong-tin-mo.component';
import { ThongTinMoService } from 'app/entities/thong-tin-mo/thong-tin-mo.service';
import { ThongTinMo } from 'app/shared/model/thong-tin-mo.model';

describe('Component Tests', () => {
    describe('ThongTinMo Management Component', () => {
        let comp: ThongTinMoComponent;
        let fixture: ComponentFixture<ThongTinMoComponent>;
        let service: ThongTinMoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [ThongTinMoComponent],
                providers: []
            })
                .overrideTemplate(ThongTinMoComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ThongTinMoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ThongTinMoService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ThongTinMo(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.thongTinMos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
