/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DtlsTestModule } from '../../../test.module';
import { TinhSachComponent } from 'app/entities/tinh-sach/tinh-sach.component';
import { TinhSachService } from 'app/entities/tinh-sach/tinh-sach.service';
import { TinhSach } from 'app/shared/model/tinh-sach.model';

describe('Component Tests', () => {
    describe('TinhSach Management Component', () => {
        let comp: TinhSachComponent;
        let fixture: ComponentFixture<TinhSachComponent>;
        let service: TinhSachService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [TinhSachComponent],
                providers: []
            })
                .overrideTemplate(TinhSachComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TinhSachComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TinhSachService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TinhSach(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.tinhSaches[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
