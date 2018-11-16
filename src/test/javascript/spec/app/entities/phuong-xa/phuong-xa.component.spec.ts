/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DtlsTestModule } from '../../../test.module';
import { PhuongXaComponent } from 'app/entities/phuong-xa/phuong-xa.component';
import { PhuongXaService } from 'app/entities/phuong-xa/phuong-xa.service';
import { PhuongXa } from 'app/shared/model/phuong-xa.model';

describe('Component Tests', () => {
    describe('PhuongXa Management Component', () => {
        let comp: PhuongXaComponent;
        let fixture: ComponentFixture<PhuongXaComponent>;
        let service: PhuongXaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [PhuongXaComponent],
                providers: []
            })
                .overrideTemplate(PhuongXaComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PhuongXaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PhuongXaService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new PhuongXa(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.phuongXas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
