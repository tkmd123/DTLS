import { IPhuongXa } from 'app/shared/model//phuong-xa.model';
import { ICapBac } from 'app/shared/model//cap-bac.model';
import { IChucVu } from 'app/shared/model//chuc-vu.model';
import { IThanNhanLietSi } from 'app/shared/model//than-nhan-liet-si.model';
import { IHaiCotLietSi } from 'app/shared/model//hai-cot-liet-si.model';
import { INhanDangLietSi } from 'app/shared/model//nhan-dang-liet-si.model';
import { IDonVi } from 'app/shared/model//don-vi.model';

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
    isDeleted?: boolean;
    trangThaiXacMinh?: string;
    uDF1?: string;
    uDF2?: string;
    uDF3?: string;
    phuongXa?: IPhuongXa;
    capBac?: ICapBac;
    chucVu?: IChucVu;
    lietSis?: IThanNhanLietSi[];
    lietSiMos?: IHaiCotLietSi[];
    lietSiNhanDangs?: INhanDangLietSi[];
    donVi?: IDonVi;
    donVi?: IDonVi;
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
        public isDeleted?: boolean,
        public trangThaiXacMinh?: string,
        public uDF1?: string,
        public uDF2?: string,
        public uDF3?: string,
        public phuongXa?: IPhuongXa,
        public capBac?: ICapBac,
        public chucVu?: IChucVu,
        public lietSis?: IThanNhanLietSi[],
        public lietSiMos?: IHaiCotLietSi[],
        public lietSiNhanDangs?: INhanDangLietSi[],
        public donVi?: IDonVi,
        public donVi?: IDonVi
    ) {
        this.isDeleted = this.isDeleted || false;
    }
}
