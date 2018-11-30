import { IThongTinKhaiQuat } from 'app/shared/model//thong-tin-khai-quat.model';
import { ILoaiDiVat } from 'app/shared/model//loai-di-vat.model';

export interface IDiVat {
    id?: number;
    giaTri?: string;
    moTa?: string;
    isDeleted?: boolean;
    udf1?: string;
    udf2?: string;
    udf3?: string;
    thongTinKhaiQuat?: IThongTinKhaiQuat;
    loaiDiVat?: ILoaiDiVat;
}

export class DiVat implements IDiVat {
    constructor(
        public id?: number,
        public giaTri?: string,
        public moTa?: string,
        public isDeleted?: boolean,
        public udf1?: string,
        public udf2?: string,
        public udf3?: string,
        public thongTinKhaiQuat?: IThongTinKhaiQuat,
        public loaiDiVat?: ILoaiDiVat
    ) {
        this.isDeleted = this.isDeleted || false;
    }
}