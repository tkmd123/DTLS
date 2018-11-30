import { IMauXetNghiem } from 'app/shared/model//mau-xet-nghiem.model';

export interface ILoaiMauXetNghiem {
    id?: number;
    maLoaiMau?: string;
    tenLoaiMau?: string;
    phanLoai?: string;
    moTa?: string;
    isDeleted?: boolean;
    udf1?: string;
    udf2?: string;
    udf3?: string;
    loaiMauXetNghiems?: IMauXetNghiem[];
}

export class LoaiMauXetNghiem implements ILoaiMauXetNghiem {
    constructor(
        public id?: number,
        public maLoaiMau?: string,
        public tenLoaiMau?: string,
        public phanLoai?: string,
        public moTa?: string,
        public isDeleted?: boolean,
        public udf1?: string,
        public udf2?: string,
        public udf3?: string,
        public loaiMauXetNghiems?: IMauXetNghiem[]
    ) {
        this.isDeleted = this.isDeleted || false;
    }
}
