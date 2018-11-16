import { IHinhThaiHaiCot } from 'app/shared/model//hinh-thai-hai-cot.model';

export interface ILoaiHinhThaiHaiCot {
    id?: number;
    maHinhThai?: string;
    tenHinhThai?: string;
    moTa?: string;
    isDeleted?: boolean;
    loaiHinhThaiHaiCots?: IHinhThaiHaiCot[];
}

export class LoaiHinhThaiHaiCot implements ILoaiHinhThaiHaiCot {
    constructor(
        public id?: number,
        public maHinhThai?: string,
        public tenHinhThai?: string,
        public moTa?: string,
        public isDeleted?: boolean,
        public loaiHinhThaiHaiCots?: IHinhThaiHaiCot[]
    ) {
        this.isDeleted = this.isDeleted || false;
    }
}
