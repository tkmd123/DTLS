import { Moment } from 'moment';
import { ITinhSachPhanUng } from 'app/shared/model//tinh-sach-phan-ung.model';
import { INhanVien } from 'app/shared/model//nhan-vien.model';
import { IMayPCR } from 'app/shared/model//may-pcr.model';

export const enum PhuongPhapTinhSach {
    ENZYM = 'ENZYM',
    KIT = 'KIT'
}

export interface ITinhSach {
    id?: number;
    maTinhSach?: string;
    thoiGianThucHien?: Moment;
    phuongPhapTinhSach?: PhuongPhapTinhSach;
    moTa?: string;
    isDeleted?: boolean;
    udf1?: string;
    udf2?: string;
    udf3?: string;
    tinhSaches?: ITinhSachPhanUng[];
    nhanVienTinhSach?: INhanVien;
    mayTinhSach?: IMayPCR;
}

export class TinhSach implements ITinhSach {
    constructor(
        public id?: number,
        public maTinhSach?: string,
        public thoiGianThucHien?: Moment,
        public phuongPhapTinhSach?: PhuongPhapTinhSach,
        public moTa?: string,
        public isDeleted?: boolean,
        public udf1?: string,
        public udf2?: string,
        public udf3?: string,
        public tinhSaches?: ITinhSachPhanUng[],
        public nhanVienTinhSach?: INhanVien,
        public mayTinhSach?: IMayPCR
    ) {
        this.isDeleted = this.isDeleted || false;
    }
}
