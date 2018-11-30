/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DtlsTestModule } from '../../../test.module';
import { PCRKetQuaComponent } from 'app/entities/pcr-ket-qua/pcr-ket-qua.component';
import { PCRKetQuaService } from 'app/entities/pcr-ket-qua/pcr-ket-qua.service';
import { PCRKetQua } from 'app/shared/model/pcr-ket-qua.model';

describe('Component Tests', () => {
    describe('PCRKetQua Management Component', () => {
        let comp: PCRKetQuaComponent;
        let fixture: ComponentFixture<PCRKetQuaComponent>;
        let service: PCRKetQuaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [PCRKetQuaComponent],
                providers: []
            })
                .overrideTemplate(PCRKetQuaComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PCRKetQuaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PCRKetQuaService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new PCRKetQua(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.pCRKetQuas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
