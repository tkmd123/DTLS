import { IMauXetNghiem } from 'app/shared/model//mau-xet-nghiem.model';
import { IPhongBan } from 'app/shared/model//phong-ban.model';
import { ILoaiThaoTac } from 'app/shared/model//loai-thao-tac.model';

export interface IThaoTac {
    id?: number;
    moTaKetQua?: string;
    trangThaiXuLy?: boolean;
    isDangThucHien?: boolean;
    isDeleted?: boolean;
    mauXetNghiem?: IMauXetNghiem;
    phongBan?: IPhongBan;
    loaiThaoTac?: ILoaiThaoTac;
}

export class ThaoTac implements IThaoTac {
    constructor(
        public id?: number,
        public moTaKetQua?: string,
        public trangThaiXuLy?: boolean,
        public isDangThucHien?: boolean,
        public isDeleted?: boolean,
        public mauXetNghiem?: IMauXetNghiem,
        public phongBan?: IPhongBan,
        public loaiThaoTac?: ILoaiThaoTac
    ) {
        this.trangThaiXuLy = this.trangThaiXuLy || false;
        this.isDangThucHien = this.isDangThucHien || false;
        this.isDeleted = this.isDeleted || false;
    }
}
