/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { TachChietService } from 'app/entities/tach-chiet/tach-chiet.service';
import { ITachChiet, TachChiet, PhuongPhapLoc } from 'app/shared/model/tach-chiet.model';

describe('Service Tests', () => {
    describe('TachChiet Service', () => {
        let injector: TestBed;
        let service: TachChietService;
        let httpMock: HttpTestingController;
        let elemDefault: ITachChiet;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(TachChietService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new TachChiet(
                0,
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                currentDate,
                PhuongPhapLoc.KIT,
                false,
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA'
            );
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        thoiGianThucHien: currentDate.format(DATE_TIME_FORMAT)
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

            it('should create a TachChiet', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        thoiGianThucHien: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        thoiGianThucHien: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new TachChiet(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a TachChiet', async () => {
                const returnedFromService = Object.assign(
                    {
                        maTachChiet: 'BBBBBB',
                        moTa: 'BBBBBB',
                        ghiChu: 'BBBBBB',
                        thoiGianThucHien: currentDate.format(DATE_TIME_FORMAT),
                        phuongPhapLoc: 'BBBBBB',
                        isDeleted: true,
                        udf1: 'BBBBBB',
                        udf2: 'BBBBBB',
                        udf3: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        thoiGianThucHien: currentDate
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

            it('should return a list of TachChiet', async () => {
                const returnedFromService = Object.assign(
                    {
                        maTachChiet: 'BBBBBB',
                        moTa: 'BBBBBB',
                        ghiChu: 'BBBBBB',
                        thoiGianThucHien: currentDate.format(DATE_TIME_FORMAT),
                        phuongPhapLoc: 'BBBBBB',
                        isDeleted: true,
                        udf1: 'BBBBBB',
                        udf2: 'BBBBBB',
                        udf3: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        thoiGianThucHien: currentDate
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

            it('should delete a TachChiet', async () => {
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
