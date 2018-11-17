/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { LoaiHinhThaiHaiCotService } from 'app/entities/loai-hinh-thai-hai-cot/loai-hinh-thai-hai-cot.service';
import { ILoaiHinhThaiHaiCot, LoaiHinhThaiHaiCot } from 'app/shared/model/loai-hinh-thai-hai-cot.model';

describe('Service Tests', () => {
    describe('LoaiHinhThaiHaiCot Service', () => {
        let injector: TestBed;
        let service: LoaiHinhThaiHaiCotService;
        let httpMock: HttpTestingController;
        let elemDefault: ILoaiHinhThaiHaiCot;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(LoaiHinhThaiHaiCotService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new LoaiHinhThaiHaiCot(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', false);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign({}, elemDefault);
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a LoaiHinhThaiHaiCot', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new LoaiHinhThaiHaiCot(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a LoaiHinhThaiHaiCot', async () => {
                const returnedFromService = Object.assign(
                    {
                        maHinhThai: 'BBBBBB',
                        tenHinhThai: 'BBBBBB',
                        moTa: 'BBBBBB',
                        isDeleted: true
                    },
                    elemDefault
                );

                const expected = Object.assign({}, returnedFromService);
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of LoaiHinhThaiHaiCot', async () => {
                const returnedFromService = Object.assign(
                    {
                        maHinhThai: 'BBBBBB',
                        tenHinhThai: 'BBBBBB',
                        moTa: 'BBBBBB',
                        isDeleted: true
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a LoaiHinhThaiHaiCot', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
