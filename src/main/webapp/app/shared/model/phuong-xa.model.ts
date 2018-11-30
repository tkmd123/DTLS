import { IQuanHuyen } from 'app/shared/model//quan-huyen.model';
import { INghiaTrang } from 'app/shared/model//nghia-trang.model';
import { IHoSoLietSi } from 'app/shared/model//ho-so-liet-si.model';
import { IHoSoThanNhan } from 'app/shared/model//ho-so-than-nhan.model';

export interface IPhuongXa {
    id?: number;
    maXa?: string;
    tenXa?: string;
    moTa?: string;
    isDeleted?: boolean;
    udf1?: string;
    udf2?: string;
    udf3?: string;
    quanHuyen?: IQuanHuyen;
    phuongXaNghiaTrangs?: INghiaTrang[];
    phuongXaLietSis?: IHoSoLietSi[];
    phuongXaThanNhans?: IHoSoThanNhan[];
}

export class PhuongXa implements IPhuongXa {
    constructor(
        public id?: number,
        public maXa?: string,
        public tenXa?: string,
        public moTa?: string,
        public isDeleted?: boolean,
        public udf1?: string,
        public udf2?: string,
        public udf3?: string,
        public quanHuyen?: IQuanHuyen,
        public phuongXaNghiaTrangs?: INghiaTrang[],
        public phuongXaLietSis?: IHoSoLietSi[],
        public phuongXaThanNhans?: IHoSoThanNhan[]
    ) {
        this.isDeleted = this.isDeleted || false;
    }
}
