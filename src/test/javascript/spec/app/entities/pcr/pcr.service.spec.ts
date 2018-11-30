/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { PCRService } from 'app/entities/pcr/pcr.service';
import { IPCR, PCR } from 'app/shared/model/pcr.model';

describe('Service Tests', () => {
    describe('PCR Service', () => {
        let injector: TestBed;
        let service: PCRService;
        let httpMock: HttpTestingController;
        let elemDefault: IPCR;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(PCRService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new PCR(
                0,
                'AAAAAAA',
                currentDate,
                'AAAAAAA',
                currentDate,
                0,
                0,
                0,
                currentDate,
                0,
                0,
                0,
                false,
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA'
            );
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        thoiGianThucHien: currentDate.format(DATE_TIME_FORMAT),
                        thoiGianBatDau: currentDate.format(DATE_TIME_FORMAT),
                        thoiGianKetThuc: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a PCR', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        thoiGianThucHien: currentDate.format(DATE_TIME_FORMAT),
                        thoiGianBatDau: currentDate.format(DATE_TIME_FORMAT),
                        thoiGianKetThuc: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        thoiGianThucHien: currentDate,
                        thoiGianBatDau: currentDate,
                        thoiGianKetThuc: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new PCR(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a PCR', async () => {
                const returnedFromService = Object.assign(
                    {
                        maPCR: 'BBBBBB',
                        thoiGianThucHien: currentDate.format(DATE_TIME_FORMAT),
                        nhanXet: 'BBBBBB',
                        thoiGianBatDau: currentDate.format(DATE_TIME_FORMAT),
                        congSuatBatDau: 1,
                        cuongDoBatDau: 1,
                        dienTheBatDau: 1,
                        thoiGianKetThuc: currentDate.format(DATE_TIME_FORMAT),
                        congSuatKetThuc: 1,
                        cuongDoKetThuc: 1,
                        dienTheKetThuc: 1,
                        isDeleted: true,
                        udf1: 'BBBBBB',
                        udf2: 'BBBBBB',
                        udf3: 'BBBBBB',
                        udf4: 'BBBBBB',
                        udf5: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        thoiGianThucHien: currentDate,
                        thoiGianBatDau: currentDate,
                        thoiGianKetThuc: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of PCR', async () => {
                const returnedFromService = Object.assign(
                    {
                        maPCR: 'BBBBBB',
                        thoiGianThucHien: currentDate.format(DATE_TIME_FORMAT),
                        nhanXet: 'BBBBBB',
                        thoiGianBatDau: currentDate.format(DATE_TIME_FORMAT),
                        congSuatBatDau: 1,
                        cuongDoBatDau: 1,
                        dienTheBatDau: 1,
                        thoiGianKetThuc: currentDate.format(DATE_TIME_FORMAT),
                        congSuatKetThuc: 1,
                        cuongDoKetThuc: 1,
                        dienTheKetThuc: 1,
                        isDeleted: true,
                        udf1: 'BBBBBB',
                        udf2: 'BBBBBB',
                        udf3: 'BBBBBB',
                        udf4: 'BBBBBB',
                        udf5: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        thoiGianThucHien: currentDate,
                        thoiGianBatDau: currentDate,
                        thoiGianKetThuc: currentDate
                    },
                    returnedFromService
                );
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

            it('should delete a PCR', async () => {
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
