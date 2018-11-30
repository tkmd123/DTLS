/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { PhuongXaService } from 'app/entities/phuong-xa/phuong-xa.service';
import { IPhuongXa, PhuongXa } from 'app/shared/model/phuong-xa.model';

describe('Service Tests', () => {
    describe('PhuongXa Service', () => {
        let injector: TestBed;
        let service: PhuongXaService;
        let httpMock: HttpTestingController;
        let elemDefault: IPhuongXa;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(PhuongXaService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new PhuongXa(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', false, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA');
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

            it('should create a PhuongXa', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new PhuongXa(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a PhuongXa', async () => {
                const returnedFromService = Object.assign(
                    {
                        maXa: 'BBBBBB',
                        tenXa: 'BBBBBB',
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

            it('should return a list of PhuongXa', async () => {
                const returnedFromService = Object.assign(
                    {
                        maXa: 'BBBBBB',
                        tenXa: 'BBBBBB',
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

            it('should delete a PhuongXa', async () => {
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
