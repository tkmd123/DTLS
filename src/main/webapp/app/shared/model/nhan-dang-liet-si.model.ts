import { IHoSoLietSi } from 'app/shared/model//ho-so-liet-si.model';
import { INhanDang } from 'app/shared/model//nhan-dang.model';

export interface INhanDangLietSi {
    id?: number;
    giaTri?: string;
    moTa?: string;
    isDeleted?: boolean;
    hoSoLietSi?: IHoSoLietSi;
    nhanDang?: INhanDang;
}

export class NhanDangLietSi implements INhanDangLietSi {
    constructor(
        public id?: number,
        public giaTri?: string,
        public moTa?: string,
        public isDeleted?: boolean,
        public hoSoLietSi?: IHoSoLietSi,
        public nhanDang?: INhanDang
    ) {
        this.isDeleted = this.isDeleted || false;
    }
}
