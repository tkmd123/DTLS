import { IThongTinKhaiQuat } from 'app/shared/model//thong-tin-khai-quat.model';
import { ILoaiDiVat } from 'app/shared/model//loai-di-vat.model';

export interface IDiVat {
    id?: number;
    moTa?: string;
    isDeleted?: boolean;
    thongTinKhaiQuat?: IThongTinKhaiQuat;
    loaiDiVat?: ILoaiDiVat;
}

export class DiVat implements IDiVat {
    constructor(
        public id?: number,
        public moTa?: string,
        public isDeleted?: boolean,
        public thongTinKhaiQuat?: IThongTinKhaiQuat,
        public loaiDiVat?: ILoaiDiVat
    ) {
        this.isDeleted = this.isDeleted || false;
    }
}
