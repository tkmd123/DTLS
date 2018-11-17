/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DtlsTestModule } from '../../../test.module';
import { PhongBanComponent } from 'app/entities/phong-ban/phong-ban.component';
import { PhongBanService } from 'app/entities/phong-ban/phong-ban.service';
import { PhongBan } from 'app/shared/model/phong-ban.model';

describe('Component Tests', () => {
    describe('PhongBan Management Component', () => {
        let comp: PhongBanComponent;
        let fixture: ComponentFixture<PhongBanComponent>;
        let service: PhongBanService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [PhongBanComponent],
                providers: []
            })
                .overrideTemplate(PhongBanComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PhongBanComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PhongBanService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new PhongBan(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.phongBans[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
