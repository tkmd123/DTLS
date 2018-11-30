import { Moment } from 'moment';
import { IMauTachChiet } from 'app/shared/model//mau-tach-chiet.model';
import { IHoaChatTachChiet } from 'app/shared/model//hoa-chat-tach-chiet.model';
import { INhanVien } from 'app/shared/model//nhan-vien.model';

export const enum PhuongPhapLoc {
    KIT = 'KIT',
    PHENOL = 'PHENOL'
}

export interface ITachChiet {
    id?: number;
    maTachChiet?: string;
    moTa?: string;
    ghiChu?: string;
    thoiGianThucHien?: Moment;
    phuongPhapLoc?: PhuongPhapLoc;
    isDeleted?: boolean;
    udf1?: string;
    udf2?: string;
    udf3?: string;
    tachChietMaus?: IMauTachChiet[];
    tachChietHoaChats?: IHoaChatTachChiet[];
    nhanVienNghienMau?: INhanVien;
    nhanVienTachADN?: INhanVien;
}

export class TachChiet implements ITachChiet {
    constructor(
        public id?: number,
        public maTachChiet?: string,
        public moTa?: string,
        public ghiChu?: string,
        public thoiGianThucHien?: Moment,
        public phuongPhapLoc?: PhuongPhapLoc,
        public isDeleted?: boolean,
        public udf1?: string,
        public udf2?: string,
        public udf3?: string,
        public tachChietMaus?: IMauTachChiet[],
        public tachChietHoaChats?: IHoaChatTachChiet[],
        public nhanVienNghienMau?: INhanVien,
        public nhanVienTachADN?: INhanVien
    ) {
        this.isDeleted = this.isDeleted || false;
    }
}
