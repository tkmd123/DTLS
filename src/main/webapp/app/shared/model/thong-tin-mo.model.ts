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
        public moLietSis?: IThongTinKhaiQuat[],
        public nghiaTrang?: INghiaTrang
    ) {
        this.isDeleted = this.isDeleted || false;
    }
}
