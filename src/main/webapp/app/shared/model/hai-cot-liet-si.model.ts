import { IHoSoLietSi } from 'app/shared/model//ho-so-liet-si.model';
import { IThongTinKhaiQuat } from 'app/shared/model//thong-tin-khai-quat.model';
import { IHinhThaiHaiCot } from 'app/shared/model//hinh-thai-hai-cot.model';
import { IMauXetNghiem } from 'app/shared/model//mau-xet-nghiem.model';

export interface IHaiCotLietSi {
    id?: number;
    moTa?: string;
    coHaiCot?: boolean;
    isDeleted?: boolean;
    hoSoLietSi?: IHoSoLietSi;
    thongTinKhaiQuat?: IThongTinKhaiQuat;
    thongTinHinhThaiHocs?: IHinhThaiHaiCot[];
    haiCotMaus?: IMauXetNghiem[];
}

export class HaiCotLietSi implements IHaiCotLietSi {
    constructor(
        public id?: number,
        public moTa?: string,
        public coHaiCot?: boolean,
        public isDeleted?: boolean,
        public hoSoLietSi?: IHoSoLietSi,
        public thongTinKhaiQuat?: IThongTinKhaiQuat,
        public thongTinHinhThaiHocs?: IHinhThaiHaiCot[],
        public haiCotMaus?: IMauXetNghiem[]
    ) {
        this.coHaiCot = this.coHaiCot || false;
        this.isDeleted = this.isDeleted || false;
    }
}
