import { IQuanHuyen } from 'app/shared/model//quan-huyen.model';
import { INghiaTrang } from 'app/shared/model//nghia-trang.model';
import { IHoSoLietSi } from 'app/shared/model//ho-so-liet-si.model';
import { IHoSoThanNhan } from 'app/shared/model//ho-so-than-nhan.model';

export interface IPhuongXa {
    id?: number;
    maXa?: string;
    tenXa?: string;
    moTa?: string;
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
        public quanHuyen?: IQuanHuyen,
        public phuongXaNghiaTrangs?: INghiaTrang[],
        public phuongXaLietSis?: IHoSoLietSi[],
        public phuongXaThanNhans?: IHoSoThanNhan[]
    ) {}
}
