import { ILoaiHinhThaiHaiCot } from 'app/shared/model//loai-hinh-thai-hai-cot.model';
import { IHaiCotLietSi } from 'app/shared/model//hai-cot-liet-si.model';

export interface IHinhThaiHaiCot {
    id?: number;
    giaTri?: string;
    moTa?: string;
    isDeleted?: boolean;
    loaiHinhThaiHaiCot?: ILoaiHinhThaiHaiCot;
    haiCotLietSi?: IHaiCotLietSi;
}

export class HinhThaiHaiCot implements IHinhThaiHaiCot {
    constructor(
        public id?: number,
        public giaTri?: string,
        public moTa?: string,
        public isDeleted?: boolean,
        public loaiHinhThaiHaiCot?: ILoaiHinhThaiHaiCot,
        public haiCotLietSi?: IHaiCotLietSi
    ) {
        this.isDeleted = this.isDeleted || false;
    }
}
