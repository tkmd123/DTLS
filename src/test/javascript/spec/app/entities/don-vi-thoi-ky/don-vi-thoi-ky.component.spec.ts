/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DtlsTestModule } from '../../../test.module';
import { DonViThoiKyComponent } from 'app/entities/don-vi-thoi-ky/don-vi-thoi-ky.component';
import { DonViThoiKyService } from 'app/entities/don-vi-thoi-ky/don-vi-thoi-ky.service';
import { DonViThoiKy } from 'app/shared/model/don-vi-thoi-ky.model';

describe('Component Tests', () => {
    describe('DonViThoiKy Management Component', () => {
        let comp: DonViThoiKyComponent;
        let fixture: ComponentFixture<DonViThoiKyComponent>;
        let service: DonViThoiKyService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [DonViThoiKyComponent],
                providers: []
            })
                .overrideTemplate(DonViThoiKyComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DonViThoiKyComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DonViThoiKyService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new DonViThoiKy(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.donViThoiKies[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
