/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { MauXetNghiemService } from 'app/entities/mau-xet-nghiem/mau-xet-nghiem.service';
import { IMauXetNghiem, MauXetNghiem } from 'app/shared/model/mau-xet-nghiem.model';

describe('Service Tests', () => {
    describe('MauXetNghiem Service', () => {
        let injector: TestBed;
        let service: MauXetNghiemService;
        let httpMock: HttpTestingController;
        let elemDefault: IMauXetNghiem;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(MauXetNghiemService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new MauXetNghiem(0, 'AAAAAAA', 'AAAAAAA', currentDate, currentDate, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', false);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        ngayLayMau: currentDate.format(DATE_TIME_FORMAT),
                        ngayTiepNhan: currentDate.format(DATE_TIME_FORMAT)
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

            it('should create a MauXetNghiem', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        ngayLayMau: currentDate.format(DATE_TIME_FORMAT),
                        ngayTiepNhan: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        ngayLayMau: currentDate,
                        ngayTiepNhan: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new MauXetNghiem(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a MauXetNghiem', async () => {
                const returnedFromService = Object.assign(
                    {
                        maMauXetNghiem: 'BBBBBB',
                        nguoiTiepNhan: 'BBBBBB',
                        ngayLayMau: currentDate.format(DATE_TIME_FORMAT),
                        ngayTiepNhan: currentDate.format(DATE_TIME_FORMAT),
                        trangThaiXuLy: 'BBBBBB',
                        moTa: 'BBBBBB',
                        ghiChu: 'BBBBBB',
                        isDeleted: true
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        ngayLayMau: currentDate,
                        ngayTiepNhan: currentDate
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

            it('should return a list of MauXetNghiem', async () => {
                const returnedFromService = Object.assign(
                    {
                        maMauXetNghiem: 'BBBBBB',
                        nguoiTiepNhan: 'BBBBBB',
                        ngayLayMau: currentDate.format(DATE_TIME_FORMAT),
                        ngayTiepNhan: currentDate.format(DATE_TIME_FORMAT),
                        trangThaiXuLy: 'BBBBBB',
                        moTa: 'BBBBBB',
                        ghiChu: 'BBBBBB',
                        isDeleted: true
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        ngayLayMau: currentDate,
                        ngayTiepNhan: currentDate
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

            it('should delete a MauXetNghiem', async () => {
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
