import { IHinhThaiHaiCot } from 'app/shared/model//hinh-thai-hai-cot.model';
import { IMauXetNghiem } from 'app/shared/model//mau-xet-nghiem.model';
import { IHoSoLietSi } from 'app/shared/model//ho-so-liet-si.model';
import { IThongTinKhaiQuat } from 'app/shared/model//thong-tin-khai-quat.model';

export interface IHaiCotLietSi {
    id?: number;
    moTa?: string;
    coHaiCot?: boolean;
    isDeleted?: boolean;
    thongTinHinhThaiHocs?: IHinhThaiHaiCot[];
    haiCotMaus?: IMauXetNghiem[];
    lietSi?: IHoSoLietSi;
    thongTinKhaiQuat?: IThongTinKhaiQuat;
}

export class HaiCotLietSi implements IHaiCotLietSi {
    constructor(
        public id?: number,
        public moTa?: string,
        public coHaiCot?: boolean,
        public isDeleted?: boolean,
        public thongTinHinhThaiHocs?: IHinhThaiHaiCot[],
        public haiCotMaus?: IMauXetNghiem[],
        public lietSi?: IHoSoLietSi,
        public thongTinKhaiQuat?: IThongTinKhaiQuat
    ) {
        this.coHaiCot = this.coHaiCot || false;
        this.isDeleted = this.isDeleted || false;
    }
}
