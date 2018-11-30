/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Data } from '@angular/router';

import { DtlsTestModule } from '../../../test.module';
import { LoaiHinhThaiHaiCotComponent } from 'app/entities/loai-hinh-thai-hai-cot/loai-hinh-thai-hai-cot.component';
import { LoaiHinhThaiHaiCotService } from 'app/entities/loai-hinh-thai-hai-cot/loai-hinh-thai-hai-cot.service';
import { LoaiHinhThaiHaiCot } from 'app/shared/model/loai-hinh-thai-hai-cot.model';

describe('Component Tests', () => {
    describe('LoaiHinhThaiHaiCot Management Component', () => {
        let comp: LoaiHinhThaiHaiCotComponent;
        let fixture: ComponentFixture<LoaiHinhThaiHaiCotComponent>;
        let service: LoaiHinhThaiHaiCotService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DtlsTestModule],
                declarations: [LoaiHinhThaiHaiCotComponent],
                providers: [
                    {
                        provide: ActivatedRoute,
                        useValue: {
                            data: {
                                subscribe: (fn: (value: Data) => void) =>
                                    fn({
                                        pagingParams: {
                                            predicate: 'id',
                                            reverse: false,
                                            page: 0
                                        }
                                    })
                            }
                        }
                    }
                ]
            })
                .overrideTemplate(LoaiHinhThaiHaiCotComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LoaiHinhThaiHaiCotComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LoaiHinhThaiHaiCotService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new LoaiHinhThaiHaiCot(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.loaiHinhThaiHaiCots[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });

        it('should load a page', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new LoaiHinhThaiHaiCot(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.loadPage(1);

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.loaiHinhThaiHaiCots[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });

        it('should re-initialize the page', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new LoaiHinhThaiHaiCot(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.loadPage(1);
            comp.reset();

            // THEN
            expect(comp.page).toEqual(0);
            expect(service.query).toHaveBeenCalledTimes(2);
            expect(comp.loaiHinhThaiHaiCots[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
        it('should calculate the sort attribute for an id', () => {
            // WHEN
            const result = comp.sort();

            // THEN
            expect(result).toEqual(['id,asc']);
        });

        it('should calculate the sort attribute for a non-id attribute', () => {
            // GIVEN
            comp.predicate = 'name';

            // WHEN
            const result = comp.sort();

            // THEN
            expect(result).toEqual(['name,asc', 'id']);
        });
    });
});
