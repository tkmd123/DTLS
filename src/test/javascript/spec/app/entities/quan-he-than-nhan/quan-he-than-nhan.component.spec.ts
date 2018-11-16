/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DtlsTestModule } from '../../../test.module';
import { QuanHeThanNhanComponent } from 'app/entities/quan-he-than-nhan/quan-he-than-nhan.component';
import { QuanHeThanNhanService } from 'app/entities/quan-he-than-nhan/quan-he-than-nhan.service';
import { QuanHeThanNhan } from 'app/shared/model/quan-he-than-nhan.model';

describe('Component Tests', () => {
    describe('QuanHeThanNhan Management Component', () => {
        let comp: QuanHeThanNhanComponent;
        let fixture: ComponentFixture<QuanHeThanNhanComponent>;
        let service: QuanHeThanNhanService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [QuanHeThanNhanComponent],
                providers: []
            })
                .overrideTemplate(QuanHeThanNhanComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(QuanHeThanNhanComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QuanHeThanNhanService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new QuanHeThanNhan(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.quanHeThanNhans[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
