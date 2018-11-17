import { INhanDang } from 'app/shared/model//nhan-dang.model';
import { IHoSoLietSi } from 'app/shared/model//ho-so-liet-si.model';

export interface INhanDangLietSi {
    id?: number;
    giaTri?: string;
    moTa?: string;
    isDeleted?: boolean;
    nhanDang?: INhanDang;
    lietSi?: IHoSoLietSi;
}

export class NhanDangLietSi implements INhanDangLietSi {
    constructor(
        public id?: number,
        public giaTri?: string,
        public moTa?: string,
        public isDeleted?: boolean,
        public nhanDang?: INhanDang,
        public lietSi?: IHoSoLietSi
    ) {
        this.isDeleted = this.isDeleted || false;
    }
}
