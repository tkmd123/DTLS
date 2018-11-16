import { ITinhThanh } from 'app/shared/model//tinh-thanh.model';
import { IPhuongXa } from 'app/shared/model//phuong-xa.model';

export interface IQuanHuyen {
    id?: number;
    tinhThanh?: ITinhThanh;
    quanHuyenPhuongXas?: IPhuongXa[];
}

export class QuanHuyen implements IQuanHuyen {
    constructor(public id?: number, public tinhThanh?: ITinhThanh, public quanHuyenPhuongXas?: IPhuongXa[]) {}
}
