import { IHaiCotLietSi } from 'app/shared/model//hai-cot-liet-si.model';
import { ILoaiHinhThaiHaiCot } from 'app/shared/model//loai-hinh-thai-hai-cot.model';

export interface IHinhThaiHaiCot {
    id?: number;
    giaTri?: string;
    moTa?: string;
    isDeleted?: boolean;
    udf1?: string;
    udf2?: string;
    udf3?: string;
    haiCotLietSi?: IHaiCotLietSi;
    loaiHinhThaiHaiCot?: ILoaiHinhThaiHaiCot;
}

export class HinhThaiHaiCot implements IHinhThaiHaiCot {
    constructor(
        public id?: number,
        public giaTri?: string,
        public moTa?: string,
        public isDeleted?: boolean,
        public udf1?: string,
        public udf2?: string,
        public udf3?: string,
        public haiCotLietSi?: IHaiCotLietSi,
        public loaiHinhThaiHaiCot?: ILoaiHinhThaiHaiCot
    ) {
        this.isDeleted = this.isDeleted || false;
    }
}
