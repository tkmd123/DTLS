/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DtlsTestModule } from '../../../test.module';
import { QuanHuyenComponent } from 'app/entities/quan-huyen/quan-huyen.component';
import { QuanHuyenService } from 'app/entities/quan-huyen/quan-huyen.service';
import { QuanHuyen } from 'app/shared/model/quan-huyen.model';

describe('Component Tests', () => {
    describe('QuanHuyen Management Component', () => {
        let comp: QuanHuyenComponent;
        let fixture: ComponentFixture<QuanHuyenComponent>;
        let service: QuanHuyenService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [QuanHuyenComponent],
                providers: []
            })
                .overrideTemplate(QuanHuyenComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(QuanHuyenComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QuanHuyenService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new QuanHuyen(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.quanHuyens[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
