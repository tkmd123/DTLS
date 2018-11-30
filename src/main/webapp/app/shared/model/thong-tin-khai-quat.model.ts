import { Moment } from 'moment';
import { IHaiCotLietSi } from 'app/shared/model//hai-cot-liet-si.model';
import { IDiVat } from 'app/shared/model//di-vat.model';
import { IThongTinMo } from 'app/shared/model//thong-tin-mo.model';

export interface IThongTinKhaiQuat {
    id?: number;
    maKhaiQuat?: string;
    nguoiKhaiQuat?: string;
    donViKhaiQuat?: string;
    thoiGianKhaiQuat?: Moment;
    coHaiCot?: boolean;
    soLuongHaiCot?: number;
    isDeleted?: boolean;
    udf1?: string;
    udf2?: string;
    udf3?: string;
    khaiQuatHaiCots?: IHaiCotLietSi[];
    khaiQuatDiVats?: IDiVat[];
    thongTinMo?: IThongTinMo;
}

export class ThongTinKhaiQuat implements IThongTinKhaiQuat {
    constructor(
        public id?: number,
        public maKhaiQuat?: string,
        public nguoiKhaiQuat?: string,
        public donViKhaiQuat?: string,
        public thoiGianKhaiQuat?: Moment,
        public coHaiCot?: boolean,
        public soLuongHaiCot?: number,
        public isDeleted?: boolean,
        public udf1?: string,
        public udf2?: string,
        public udf3?: string,
        public khaiQuatHaiCots?: IHaiCotLietSi[],
        public khaiQuatDiVats?: IDiVat[],
        public thongTinMo?: IThongTinMo
    ) {
        this.coHaiCot = this.coHaiCot || false;
        this.isDeleted = this.isDeleted || false;
    }
}
