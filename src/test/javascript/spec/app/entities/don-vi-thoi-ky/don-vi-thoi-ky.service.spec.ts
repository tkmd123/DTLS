/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { DonViThoiKyService } from 'app/entities/don-vi-thoi-ky/don-vi-thoi-ky.service';
import { IDonViThoiKy, DonViThoiKy } from 'app/shared/model/don-vi-thoi-ky.model';

describe('Service Tests', () => {
    describe('DonViThoiKy Service', () => {
        let injector: TestBed;
        let service: DonViThoiKyService;
        let httpMock: HttpTestingController;
        let elemDefault: IDonViThoiKy;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(DonViThoiKyService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new DonViThoiKy(0, 0, 0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', false, 'AAAAAAA');
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

            it('should create a DonViThoiKy', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new DonViThoiKy(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a DonViThoiKy', async () => {
                const returnedFromService = Object.assign(
                    {
                        tuNam: 1,
                        denNam: 1,
                        diaDiemMoTa: 'BBBBBB',
                        diaDiemXa: 'BBBBBB',
                        diaDiemHuyen: 'BBBBBB',
                        diaDiemTinh: 'BBBBBB',
                        isDeleted: true,
                        ghiChu: 'BBBBBB'
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

            it('should return a list of DonViThoiKy', async () => {
                const returnedFromService = Object.assign(
                    {
                        tuNam: 1,
                        denNam: 1,
                        diaDiemMoTa: 'BBBBBB',
                        diaDiemXa: 'BBBBBB',
                        diaDiemHuyen: 'BBBBBB',
                        diaDiemTinh: 'BBBBBB',
                        isDeleted: true,
                        ghiChu: 'BBBBBB'
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

            it('should delete a DonViThoiKy', async () => {
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
