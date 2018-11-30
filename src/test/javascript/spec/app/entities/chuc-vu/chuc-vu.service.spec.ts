/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { ChucVuService } from 'app/entities/chuc-vu/chuc-vu.service';
import { IChucVu, ChucVu } from 'app/shared/model/chuc-vu.model';

describe('Service Tests', () => {
    describe('ChucVu Service', () => {
        let injector: TestBed;
        let service: ChucVuService;
        let httpMock: HttpTestingController;
        let elemDefault: IChucVu;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(ChucVuService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new ChucVu(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', false, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA');
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

            it('should create a ChucVu', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new ChucVu(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a ChucVu', async () => {
                const returnedFromService = Object.assign(
                    {
                        maChucVu: 'BBBBBB',
                        tenChucVu: 'BBBBBB',
                        moTa: 'BBBBBB',
                        isDeleted: true,
                        udf1: 'BBBBBB',
                        udf2: 'BBBBBB',
                        udf3: 'BBBBBB'
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

            it('should return a list of ChucVu', async () => {
                const returnedFromService = Object.assign(
                    {
                        maChucVu: 'BBBBBB',
                        tenChucVu: 'BBBBBB',
                        moTa: 'BBBBBB',
                        isDeleted: true,
                        udf1: 'BBBBBB',
                        udf2: 'BBBBBB',
                        udf3: 'BBBBBB'
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

            it('should delete a ChucVu', async () => {
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
