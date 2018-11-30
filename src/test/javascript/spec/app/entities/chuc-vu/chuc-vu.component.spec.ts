/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DtlsTestModule } from '../../../test.module';
import { ChucVuComponent } from 'app/entities/chuc-vu/chuc-vu.component';
import { ChucVuService } from 'app/entities/chuc-vu/chuc-vu.service';
import { ChucVu } from 'app/shared/model/chuc-vu.model';

describe('Component Tests', () => {
    describe('ChucVu Management Component', () => {
        let comp: ChucVuComponent;
        let fixture: ComponentFixture<ChucVuComponent>;
        let service: ChucVuService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [ChucVuComponent],
                providers: []
            })
                .overrideTemplate(ChucVuComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ChucVuComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChucVuService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ChucVu(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.chucVus[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
