import { IHinhThaiHaiCot } from 'app/shared/model//hinh-thai-hai-cot.model';

export interface ILoaiHinhThaiHaiCot {
    id?: number;
    maHinhThai?: string;
    tenHinhThai?: string;
    moTa?: string;
    isDeleted?: boolean;
    udf1?: string;
    udf2?: string;
    udf3?: string;
    loaiHinhThaiHaiCots?: IHinhThaiHaiCot[];
}

export class LoaiHinhThaiHaiCot implements ILoaiHinhThaiHaiCot {
    constructor(
        public id?: number,
        public maHinhThai?: string,
        public tenHinhThai?: string,
        public moTa?: string,
        public isDeleted?: boolean,
        public udf1?: string,
        public udf2?: string,
        public udf3?: string,
        public loaiHinhThaiHaiCots?: IHinhThaiHaiCot[]
    ) {
        this.isDeleted = this.isDeleted || false;
    }
}
