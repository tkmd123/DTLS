/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DtlsTestModule } from '../../../test.module';
import { MauTachChietComponent } from 'app/entities/mau-tach-chiet/mau-tach-chiet.component';
import { MauTachChietService } from 'app/entities/mau-tach-chiet/mau-tach-chiet.service';
import { MauTachChiet } from 'app/shared/model/mau-tach-chiet.model';

describe('Component Tests', () => {
    describe('MauTachChiet Management Component', () => {
        let comp: MauTachChietComponent;
        let fixture: ComponentFixture<MauTachChietComponent>;
        let service: MauTachChietService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [MauTachChietComponent],
                providers: []
            })
                .overrideTemplate(MauTachChietComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MauTachChietComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MauTachChietService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new MauTachChiet(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.mauTachChiets[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
