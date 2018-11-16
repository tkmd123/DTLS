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
    ghiChu?: string;
    isDeleted?: boolean;
    donViHySinhs?: IHoSoLietSi[];
    donViHuanLuyens?: IHoSoLietSi[];
    donVi?: IDonVi;
    donViQuanLies?: IDonVi[];
    donViThoiKies?: IDonViThoiKy[];
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
        public ghiChu?: string,
        public isDeleted?: boolean,
        public donViHySinhs?: IHoSoLietSi[],
        public donViHuanLuyens?: IHoSoLietSi[],
        public donVi?: IDonVi,
        public donViQuanLies?: IDonVi[],
        public donViThoiKies?: IDonViThoiKy[]
    ) {
        this.isDeleted = this.isDeleted || false;
    }
}
