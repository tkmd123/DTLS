import { IThongTinKhaiQuat } from 'app/shared/model//thong-tin-khai-quat.model';
import { INghiaTrang } from 'app/shared/model//nghia-trang.model';

export interface IThongTinMo {
    id?: number;
    khuMo?: string;
    loMo?: string;
    hangMo?: number;
    soMo?: number;
    moTa?: string;
    isDeleted?: boolean;
    udf1?: string;
    udf2?: string;
    udf3?: string;
    moLietSis?: IThongTinKhaiQuat[];
    nghiaTrang?: INghiaTrang;
}

export class ThongTinMo implements IThongTinMo {
    constructor(
        public id?: number,
        public khuMo?: string,
        public loMo?: string,
        public hangMo?: number,
        public soMo?: number,
        public moTa?: string,
        public isDeleted?: boolean,
        public udf1?: string,
        public udf2?: string,
        public udf3?: string,
        public moLietSis?: IThongTinKhaiQuat[],
        public nghiaTrang?: INghiaTrang
    ) {
        this.isDeleted = this.isDeleted || false;
    }
}
