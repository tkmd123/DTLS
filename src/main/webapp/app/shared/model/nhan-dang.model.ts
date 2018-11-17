import { INhanDangLietSi } from 'app/shared/model//nhan-dang-liet-si.model';

export interface INhanDang {
    id?: number;
    maNhanDang?: string;
    tenNhanDang?: string;
    donViTinh?: string;
    moTa?: string;
    isDeleted?: boolean;
    nhanDangLietSis?: INhanDangLietSi[];
}

export class NhanDang implements INhanDang {
    constructor(
        public id?: number,
        public maNhanDang?: string,
        public tenNhanDang?: string,
        public donViTinh?: string,
        public moTa?: string,
        public isDeleted?: boolean,
        public nhanDangLietSis?: INhanDangLietSi[]
    ) {
        this.isDeleted = this.isDeleted || false;
    }
}
