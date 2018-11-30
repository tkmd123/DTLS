import { ITinhThanh } from 'app/shared/model//tinh-thanh.model';
import { IPhuongXa } from 'app/shared/model//phuong-xa.model';

export interface IQuanHuyen {
    id?: number;
    maHuyen?: string;
    tenHuyen?: string;
    moTa?: string;
    isDeleted?: boolean;
    udf1?: string;
    udf2?: string;
    udf3?: string;
    tinhThanh?: ITinhThanh;
    quanHuyenPhuongXas?: IPhuongXa[];
}

export class QuanHuyen implements IQuanHuyen {
    constructor(
        public id?: number,
        public maHuyen?: string,
        public tenHuyen?: string,
        public moTa?: string,
        public isDeleted?: boolean,
        public udf1?: string,
        public udf2?: string,
        public udf3?: string,
        public tinhThanh?: ITinhThanh,
        public quanHuyenPhuongXas?: IPhuongXa[]
    ) {
        this.isDeleted = this.isDeleted || false;
    }
}
