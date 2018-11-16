import { IMauXetNghiem } from 'app/shared/model//mau-xet-nghiem.model';

export interface ILoaiMauXetNghiem {
    id?: number;
    maLoaiMau?: string;
    tenLoaiMau?: string;
    moTa?: string;
    isDeleted?: boolean;
    loaiMauXetNghiems?: IMauXetNghiem[];
}

export class LoaiMauXetNghiem implements ILoaiMauXetNghiem {
    constructor(
        public id?: number,
        public maLoaiMau?: string,
        public tenLoaiMau?: string,
        public moTa?: string,
        public isDeleted?: boolean,
        public loaiMauXetNghiems?: IMauXetNghiem[]
    ) {
        this.isDeleted = this.isDeleted || false;
    }
}
