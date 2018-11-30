import { IUser } from 'app/core/user/user.model';
import { ITinhSach } from 'app/shared/model//tinh-sach.model';
import { IPCR } from 'app/shared/model//pcr.model';
import { ITachChiet } from 'app/shared/model//tach-chiet.model';
import { IHoSoGiamDinh } from 'app/shared/model//ho-so-giam-dinh.model';
import { IMauXetNghiem } from 'app/shared/model//mau-xet-nghiem.model';
import { IPhongBan } from 'app/shared/model//phong-ban.model';

export interface INhanVien {
    id?: number;
    maNhanVien?: string;
    tenNhanVien?: string;
    soDienThoai?: string;
    email?: string;
    moTa?: string;
    ghiChu?: string;
    isDeleted?: boolean;
    udf1?: string;
    udf2?: string;
    udf3?: string;
    userNhanVien?: IUser;
    nhanVienTinhSaches?: ITinhSach[];
    nhanVienPCRS?: IPCR[];
    nhanVienNghienMaus?: ITachChiet[];
    nhanVienTachADNS?: ITachChiet[];
    nhanVienHSGDS?: IHoSoGiamDinh[];
    nhanVienNhanMaus?: IMauXetNghiem[];
    phongban?: IPhongBan;
}

export class NhanVien implements INhanVien {
    constructor(
        public id?: number,
        public maNhanVien?: string,
        public tenNhanVien?: string,
        public soDienThoai?: string,
        public email?: string,
        public moTa?: string,
        public ghiChu?: string,
        public isDeleted?: boolean,
        public udf1?: string,
        public udf2?: string,
        public udf3?: string,
        public userNhanVien?: IUser,
        public nhanVienTinhSaches?: ITinhSach[],
        public nhanVienPCRS?: IPCR[],
        public nhanVienNghienMaus?: ITachChiet[],
        public nhanVienTachADNS?: ITachChiet[],
        public nhanVienHSGDS?: IHoSoGiamDinh[],
        public nhanVienNhanMaus?: IMauXetNghiem[],
        public phongban?: IPhongBan
    ) {
        this.isDeleted = this.isDeleted || false;
    }
}
