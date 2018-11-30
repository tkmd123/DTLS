import { IMauXetNghiem } from 'app/shared/model//mau-xet-nghiem.model';
import { ITachChiet } from 'app/shared/model//tach-chiet.model';

export interface IMauTachChiet {
    id?: number;
    dacDiemMau?: string;
    soLuongSuDung?: number;
    nhanXet?: string;
    xuLyBeMat?: string;
    khoiLuongNghien?: number;
    khoiLuongDeTach?: number;
    khoiLuongSauKhu?: number;
    khoiLuongSauLoc?: number;
    khoiLuongADN?: number;
    khoiLuongChuaNghien?: number;
    ghiChuTach?: string;
    ghiChuADN?: string;
    isDeleted?: boolean;
    udf1?: string;
    udf2?: string;
    udf3?: string;
    float1?: number;
    float2?: number;
    float3?: number;
    mauTachChiet?: IMauXetNghiem;
    tachChietMau?: ITachChiet;
}

export class MauTachChiet implements IMauTachChiet {
    constructor(
        public id?: number,
        public dacDiemMau?: string,
        public soLuongSuDung?: number,
        public nhanXet?: string,
        public xuLyBeMat?: string,
        public khoiLuongNghien?: number,
        public khoiLuongDeTach?: number,
        public khoiLuongSauKhu?: number,
        public khoiLuongSauLoc?: number,
        public khoiLuongADN?: number,
        public khoiLuongChuaNghien?: number,
        public ghiChuTach?: string,
        public ghiChuADN?: string,
        public isDeleted?: boolean,
        public udf1?: string,
        public udf2?: string,
        public udf3?: string,
        public float1?: number,
        public float2?: number,
        public float3?: number,
        public mauTachChiet?: IMauXetNghiem,
        public tachChietMau?: ITachChiet
    ) {
        this.isDeleted = this.isDeleted || false;
    }
}
