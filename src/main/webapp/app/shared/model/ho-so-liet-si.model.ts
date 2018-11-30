import { IThanNhanLietSi } from 'app/shared/model//than-nhan-liet-si.model';
import { IHaiCotLietSi } from 'app/shared/model//hai-cot-liet-si.model';
import { IPhuongXa } from 'app/shared/model//phuong-xa.model';
import { IDonVi } from 'app/shared/model//don-vi.model';
import { ICapBac } from 'app/shared/model//cap-bac.model';
import { IChucVu } from 'app/shared/model//chuc-vu.model';

export interface IHoSoLietSi {
    id?: number;
    maCCS?: string;
    maLietSi?: string;
    hoTen?: string;
    tenKhac?: string;
    biDanh?: string;
    gioiTinh?: string;
    namSinh?: string;
    queThon?: string;
    queXa?: string;
    queHuyen?: string;
    queTinh?: string;
    donVi?: string;
    namNhapNgu?: number;
    namXuatNgu?: number;
    namTaiNgu?: number;
    namDiB?: string;
    hySinhNgay?: number;
    hySinhThang?: number;
    hySinhNam?: number;
    hySinhLyDo?: string;
    hySinhDonVi?: string;
    hySinhTranDanh?: string;
    hySinhDiaDiem?: string;
    hySinhXa?: string;
    hySinhHuyen?: string;
    hySinhTinh?: string;
    anTangDiaDiem?: string;
    anTangXa?: string;
    anTangHuyen?: string;
    anTangTinh?: string;
    ngayBaoTu?: string;
    giayBaoTu?: string;
    vatDungKemTheo?: string;
    ghiChu?: string;
    trangThaiXacMinh?: string;
    chieuCao?: number;
    canNang?: number;
    nhomMau?: string;
    dacDiemRang?: string;
    tinhHuongHySinh?: string;
    tinhHuongTimThay?: string;
    dacDiemNhanDang?: string;
    isDeleted?: boolean;
    udf1?: string;
    udf2?: string;
    udf3?: string;
    udf4?: string;
    udf5?: string;
    lietSis?: IThanNhanLietSi[];
    lietSiMos?: IHaiCotLietSi[];
    phuongXa?: IPhuongXa;
    donViHiSinh?: IDonVi;
    donViHuanLuyen?: IDonVi;
    capBac?: ICapBac;
    chucVu?: IChucVu;
}

export class HoSoLietSi implements IHoSoLietSi {
    constructor(
        public id?: number,
        public maCCS?: string,
        public maLietSi?: string,
        public hoTen?: string,
        public tenKhac?: string,
        public biDanh?: string,
        public gioiTinh?: string,
        public namSinh?: string,
        public queThon?: string,
        public queXa?: string,
        public queHuyen?: string,
        public queTinh?: string,
        public donVi?: string,
        public namNhapNgu?: number,
        public namXuatNgu?: number,
        public namTaiNgu?: number,
        public namDiB?: string,
        public hySinhNgay?: number,
        public hySinhThang?: number,
        public hySinhNam?: number,
        public hySinhLyDo?: string,
        public hySinhDonVi?: string,
        public hySinhTranDanh?: string,
        public hySinhDiaDiem?: string,
        public hySinhXa?: string,
        public hySinhHuyen?: string,
        public hySinhTinh?: string,
        public anTangDiaDiem?: string,
        public anTangXa?: string,
        public anTangHuyen?: string,
        public anTangTinh?: string,
        public ngayBaoTu?: string,
        public giayBaoTu?: string,
        public vatDungKemTheo?: string,
        public ghiChu?: string,
        public trangThaiXacMinh?: string,
        public chieuCao?: number,
        public canNang?: number,
        public nhomMau?: string,
        public dacDiemRang?: string,
        public tinhHuongHySinh?: string,
        public tinhHuongTimThay?: string,
        public dacDiemNhanDang?: string,
        public isDeleted?: boolean,
        public udf1?: string,
        public udf2?: string,
        public udf3?: string,
        public udf4?: string,
        public udf5?: string,
        public lietSis?: IThanNhanLietSi[],
        public lietSiMos?: IHaiCotLietSi[],
        public phuongXa?: IPhuongXa,
        public donViHiSinh?: IDonVi,
        public donViHuanLuyen?: IDonVi,
        public capBac?: ICapBac,
        public chucVu?: IChucVu
    ) {
        this.isDeleted = this.isDeleted || false;
    }
}
