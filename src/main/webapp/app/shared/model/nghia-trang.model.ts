import { IPhuongXa } from 'app/shared/model//phuong-xa.model';
import { IThongTinMo } from 'app/shared/model//thong-tin-mo.model';

export interface INghiaTrang {
    id?: number;
    maNghiaTrang?: string;
    tenNghiaTrang?: string;
    diaChi?: string;
    nguoiLienHe?: string;
    dienThoai?: string;
    email?: string;
    moTa?: string;
    isDeleted?: boolean;
    phuongXa?: IPhuongXa;
    nghiaTrangMos?: IThongTinMo[];
}

export class NghiaTrang implements INghiaTrang {
    constructor(
        public id?: number,
        public maNghiaTrang?: string,
        public tenNghiaTrang?: string,
        public diaChi?: string,
        public nguoiLienHe?: string,
        public dienThoai?: string,
        public email?: string,
        public moTa?: string,
        public isDeleted?: boolean,
        public phuongXa?: IPhuongXa,
        public nghiaTrangMos?: IThongTinMo[]
    ) {
        this.isDeleted = this.isDeleted || false;
    }
}
