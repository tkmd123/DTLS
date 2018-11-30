/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { MauTachChietService } from 'app/entities/mau-tach-chiet/mau-tach-chiet.service';
import { IMauTachChiet, MauTachChiet } from 'app/shared/model/mau-tach-chiet.model';

describe('Service Tests', () => {
    describe('MauTachChiet Service', () => {
        let injector: TestBed;
        let service: MauTachChietService;
        let httpMock: HttpTestingController;
        let elemDefault: IMauTachChiet;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(MauTachChietService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new MauTachChiet(
                0,
                'AAAAAAA',
                0,
                'AAAAAAA',
                'AAAAAAA',
                0,
                0,
                0,
                0,
                0,
                0,
                'AAAAAAA',
                'AAAAAAA',
                false,
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                0,
                0,
                0
            );
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

            it('should create a MauTachChiet', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new MauTachChiet(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a MauTachChiet', async () => {
                const returnedFromService = Object.assign(
                    {
                        dacDiemMau: 'BBBBBB',
                        soLuongSuDung: 1,
                        nhanXet: 'BBBBBB',
                        xuLyBeMat: 'BBBBBB',
                        khoiLuongNghien: 1,
                        khoiLuongDeTach: 1,
                        khoiLuongSauKhu: 1,
                        khoiLuongSauLoc: 1,
                        khoiLuongADN: 1,
                        khoiLuongChuaNghien: 1,
                        ghiChuTach: 'BBBBBB',
                        ghiChuADN: 'BBBBBB',
                        isDeleted: true,
                        udf1: 'BBBBBB',
                        udf2: 'BBBBBB',
                        udf3: 'BBBBBB',
                        float1: 1,
                        float2: 1,
                        float3: 1
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

            it('should return a list of MauTachChiet', async () => {
                const returnedFromService = Object.assign(
                    {
                        dacDiemMau: 'BBBBBB',
                        soLuongSuDung: 1,
                        nhanXet: 'BBBBBB',
                        xuLyBeMat: 'BBBBBB',
                        khoiLuongNghien: 1,
                        khoiLuongDeTach: 1,
                        khoiLuongSauKhu: 1,
                        khoiLuongSauLoc: 1,
                        khoiLuongADN: 1,
                        khoiLuongChuaNghien: 1,
                        ghiChuTach: 'BBBBBB',
                        ghiChuADN: 'BBBBBB',
                        isDeleted: true,
                        udf1: 'BBBBBB',
                        udf2: 'BBBBBB',
                        udf3: 'BBBBBB',
                        float1: 1,
                        float2: 1,
                        float3: 1
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

            it('should delete a MauTachChiet', async () => {
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
