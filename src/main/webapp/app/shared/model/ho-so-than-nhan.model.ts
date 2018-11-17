import { Moment } from 'moment';
import { IThanNhanLietSi } from 'app/shared/model//than-nhan-liet-si.model';
import { IMauXetNghiem } from 'app/shared/model//mau-xet-nghiem.model';
import { IPhuongXa } from 'app/shared/model//phuong-xa.model';

export interface IHoSoThanNhan {
    id?: number;
    maThanNhan?: string;
    isLayMau?: boolean;
    hoTen?: string;
    namSinh?: Moment;
    gioiTinh?: string;
    soCMT?: string;
    diaChi?: string;
    dienThoaiChinh?: string;
    dienThoaiPhu?: string;
    email?: string;
    ghiChu?: string;
    isDeleted?: boolean;
    uDF1?: string;
    uDF2?: string;
    uDF3?: string;
    thanNhans?: IThanNhanLietSi[];
    thanNhanMaus?: IMauXetNghiem[];
    phuongXa?: IPhuongXa;
}

export class HoSoThanNhan implements IHoSoThanNhan {
    constructor(
        public id?: number,
        public maThanNhan?: string,
        public isLayMau?: boolean,
        public hoTen?: string,
        public namSinh?: Moment,
        public gioiTinh?: string,
        public soCMT?: string,
        public diaChi?: string,
        public dienThoaiChinh?: string,
        public dienThoaiPhu?: string,
        public email?: string,
        public ghiChu?: string,
        public isDeleted?: boolean,
        public uDF1?: string,
        public uDF2?: string,
        public uDF3?: string,
        public thanNhans?: IThanNhanLietSi[],
        public thanNhanMaus?: IMauXetNghiem[],
        public phuongXa?: IPhuongXa
    ) {
        this.isLayMau = this.isLayMau || false;
        this.isDeleted = this.isDeleted || false;
    }
}
