/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { HoSoLietSiService } from 'app/entities/ho-so-liet-si/ho-so-liet-si.service';
import { IHoSoLietSi, HoSoLietSi } from 'app/shared/model/ho-so-liet-si.model';

describe('Service Tests', () => {
    describe('HoSoLietSi Service', () => {
        let injector: TestBed;
        let service: HoSoLietSiService;
        let httpMock: HttpTestingController;
        let elemDefault: IHoSoLietSi;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(HoSoLietSiService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new HoSoLietSi(
                0,
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                0,
                0,
                0,
                'AAAAAAA',
                0,
                0,
                0,
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                0,
                0,
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
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
                const returnedFromService = Object.assign({}, elemDefault);
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a HoSoLietSi', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new HoSoLietSi(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a HoSoLietSi', async () => {
                const returnedFromService = Object.assign(
                    {
                        maCCS: 'BBBBBB',
                        maLietSi: 'BBBBBB',
                        hoTen: 'BBBBBB',
                        tenKhac: 'BBBBBB',
                        biDanh: 'BBBBBB',
                        gioiTinh: 'BBBBBB',
                        namSinh: 'BBBBBB',
                        queThon: 'BBBBBB',
                        queXa: 'BBBBBB',
                        queHuyen: 'BBBBBB',
                        queTinh: 'BBBBBB',
                        donVi: 'BBBBBB',
                        namNhapNgu: 1,
                        namXuatNgu: 1,
                        namTaiNgu: 1,
                        namDiB: 'BBBBBB',
                        hySinhNgay: 1,
                        hySinhThang: 1,
                        hySinhNam: 1,
                        hySinhLyDo: 'BBBBBB',
                        hySinhDonVi: 'BBBBBB',
                        hySinhTranDanh: 'BBBBBB',
                        hySinhDiaDiem: 'BBBBBB',
                        hySinhXa: 'BBBBBB',
                        hySinhHuyen: 'BBBBBB',
                        hySinhTinh: 'BBBBBB',
                        anTangDiaDiem: 'BBBBBB',
                        anTangXa: 'BBBBBB',
                        anTangHuyen: 'BBBBBB',
                        anTangTinh: 'BBBBBB',
                        ngayBaoTu: 'BBBBBB',
                        giayBaoTu: 'BBBBBB',
                        vatDungKemTheo: 'BBBBBB',
                        ghiChu: 'BBBBBB',
                        trangThaiXacMinh: 'BBBBBB',
                        chieuCao: 1,
                        canNang: 1,
                        nhomMau: 'BBBBBB',
                        dacDiemRang: 'BBBBBB',
                        tinhHuongHySinh: 'BBBBBB',
                        tinhHuongTimThay: 'BBBBBB',
                        dacDiemNhanDang: 'BBBBBB',
                        isDeleted: true,
                        udf1: 'BBBBBB',
                        udf2: 'BBBBBB',
                        udf3: 'BBBBBB',
                        udf4: 'BBBBBB',
                        udf5: 'BBBBBB'
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

            it('should return a list of HoSoLietSi', async () => {
                const returnedFromService = Object.assign(
                    {
                        maCCS: 'BBBBBB',
                        maLietSi: 'BBBBBB',
                        hoTen: 'BBBBBB',
                        tenKhac: 'BBBBBB',
                        biDanh: 'BBBBBB',
                        gioiTinh: 'BBBBBB',
                        namSinh: 'BBBBBB',
                        queThon: 'BBBBBB',
                        queXa: 'BBBBBB',
                        queHuyen: 'BBBBBB',
                        queTinh: 'BBBBBB',
                        donVi: 'BBBBBB',
                        namNhapNgu: 1,
                        namXuatNgu: 1,
                        namTaiNgu: 1,
                        namDiB: 'BBBBBB',
                        hySinhNgay: 1,
                        hySinhThang: 1,
                        hySinhNam: 1,
                        hySinhLyDo: 'BBBBBB',
                        hySinhDonVi: 'BBBBBB',
                        hySinhTranDanh: 'BBBBBB',
                        hySinhDiaDiem: 'BBBBBB',
                        hySinhXa: 'BBBBBB',
                        hySinhHuyen: 'BBBBBB',
                        hySinhTinh: 'BBBBBB',
                        anTangDiaDiem: 'BBBBBB',
                        anTangXa: 'BBBBBB',
                        anTangHuyen: 'BBBBBB',
                        anTangTinh: 'BBBBBB',
                        ngayBaoTu: 'BBBBBB',
                        giayBaoTu: 'BBBBBB',
                        vatDungKemTheo: 'BBBBBB',
                        ghiChu: 'BBBBBB',
                        trangThaiXacMinh: 'BBBBBB',
                        chieuCao: 1,
                        canNang: 1,
                        nhomMau: 'BBBBBB',
                        dacDiemRang: 'BBBBBB',
                        tinhHuongHySinh: 'BBBBBB',
                        tinhHuongTimThay: 'BBBBBB',
                        dacDiemNhanDang: 'BBBBBB',
                        isDeleted: true,
                        udf1: 'BBBBBB',
                        udf2: 'BBBBBB',
                        udf3: 'BBBBBB',
                        udf4: 'BBBBBB',
                        udf5: 'BBBBBB'
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

            it('should delete a HoSoLietSi', async () => {
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
