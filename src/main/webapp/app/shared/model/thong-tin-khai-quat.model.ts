import { Moment } from 'moment';
import { IThongTinMo } from 'app/shared/model//thong-tin-mo.model';
import { IHaiCotLietSi } from 'app/shared/model//hai-cot-liet-si.model';
import { IDiVat } from 'app/shared/model//di-vat.model';

export interface IThongTinKhaiQuat {
    id?: number;
    maKhaiQuat?: string;
    nguoiKhaiQuat?: string;
    donViKhaiQuat?: string;
    thoiGianKhaiQuat?: Moment;
    thongTinMo?: IThongTinMo;
    khaiQuatHaiCots?: IHaiCotLietSi[];
    khaiQuatDiVats?: IDiVat[];
}

export class ThongTinKhaiQuat implements IThongTinKhaiQuat {
    constructor(
        public id?: number,
        public maKhaiQuat?: string,
        public nguoiKhaiQuat?: string,
        public donViKhaiQuat?: string,
        public thoiGianKhaiQuat?: Moment,
        public thongTinMo?: IThongTinMo,
        public khaiQuatHaiCots?: IHaiCotLietSi[],
        public khaiQuatDiVats?: IDiVat[]
    ) {}
}
