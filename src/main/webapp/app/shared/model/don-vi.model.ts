import { IHoSoLietSi } from 'app/shared/model//ho-so-liet-si.model';
import { IDonVi } from 'app/shared/model//don-vi.model';
import { IDonViThoiKy } from 'app/shared/model//don-vi-thoi-ky.model';

export interface IDonVi {
    id?: number;
    maDonVi?: string;
    tenDonVi?: string;
    tenTat?: string;
    phanMuc?: string;
    phanCap?: string;
    phanKhoi?: string;
    moTa?: string;
    ghiChu?: string;
    isDeleted?: boolean;
    udf1?: string;
    udf2?: string;
    udf3?: string;
    donViHySinhs?: IHoSoLietSi[];
    donViHuanLuyens?: IHoSoLietSi[];
    donViQuanLies?: IDonVi[];
    donViThoiKies?: IDonViThoiKy[];
    donViQuanLy?: IDonVi;
}

export class DonVi implements IDonVi {
    constructor(
        public id?: number,
        public maDonVi?: string,
        public tenDonVi?: string,
        public tenTat?: string,
        public phanMuc?: string,
        public phanCap?: string,
        public phanKhoi?: string,
        public moTa?: string,
        public ghiChu?: string,
        public isDeleted?: boolean,
        public udf1?: string,
        public udf2?: string,
        public udf3?: string,
        public donViHySinhs?: IHoSoLietSi[],
        public donViHuanLuyens?: IHoSoLietSi[],
        public donViQuanLies?: IDonVi[],
        public donViThoiKies?: IDonViThoiKy[],
        public donViQuanLy?: IDonVi
    ) {
        this.isDeleted = this.isDeleted || false;
    }
}
