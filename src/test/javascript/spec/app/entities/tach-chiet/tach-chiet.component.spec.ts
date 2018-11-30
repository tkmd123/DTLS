/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DtlsTestModule } from '../../../test.module';
import { TachChietComponent } from 'app/entities/tach-chiet/tach-chiet.component';
import { TachChietService } from 'app/entities/tach-chiet/tach-chiet.service';
import { TachChiet } from 'app/shared/model/tach-chiet.model';

describe('Component Tests', () => {
    describe('TachChiet Management Component', () => {
        let comp: TachChietComponent;
        let fixture: ComponentFixture<TachChietComponent>;
        let service: TachChietService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [TachChietComponent],
                providers: []
            })
                .overrideTemplate(TachChietComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TachChietComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TachChietService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TachChiet(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.tachChiets[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
