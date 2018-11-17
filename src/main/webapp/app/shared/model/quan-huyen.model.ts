import { ITinhThanh } from 'app/shared/model//tinh-thanh.model';
import { IPhuongXa } from 'app/shared/model//phuong-xa.model';

export interface IQuanHuyen {
    id?: number;
    maHuyen?: string;
    tenHuyen?: string;
    moTa?: string;
    tinhThanh?: ITinhThanh;
    quanHuyenPhuongXas?: IPhuongXa[];
}

export class QuanHuyen implements IQuanHuyen {
    constructor(
        public id?: number,
        public maHuyen?: string,
        public tenHuyen?: string,
        public moTa?: string,
        public tinhThanh?: ITinhThanh,
        public quanHuyenPhuongXas?: IPhuongXa[]
    ) {}
}
