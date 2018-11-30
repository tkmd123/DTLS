import { IThongTinMo } from 'app/shared/model//thong-tin-mo.model';
import { IPhuongXa } from 'app/shared/model//phuong-xa.model';

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
    udf1?: string;
    udf2?: string;
    udf3?: string;
    nghiaTrangMos?: IThongTinMo[];
    phuongXa?: IPhuongXa;
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
        public udf1?: string,
        public udf2?: string,
        public udf3?: string,
        public nghiaTrangMos?: IThongTinMo[],
        public phuongXa?: IPhuongXa
    ) {
        this.isDeleted = this.isDeleted || false;
    }
}