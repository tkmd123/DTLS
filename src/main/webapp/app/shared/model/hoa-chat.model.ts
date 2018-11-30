import { ITinhSachPhanUng } from 'app/shared/model//tinh-sach-phan-ung.model';
import { IPCRPhanUng } from 'app/shared/model//pcr-phan-ung.model';
import { IHoaChatTachChiet } from 'app/shared/model//hoa-chat-tach-chiet.model';

export interface IHoaChat {
    id?: number;
    maHoaChat?: string;
    tenHoaChat?: string;
    hangHoaChat?: string;
    donViTinh?: string;
    moTa?: string;
    isDeleted?: boolean;
    udf1?: string;
    udf2?: string;
    udf3?: string;
    hoaChatTinhSaches?: ITinhSachPhanUng[];
    hoaChatPhanUngs?: IPCRPhanUng[];
    hoaChatTachChiets?: IHoaChatTachChiet[];
}

export class HoaChat implements IHoaChat {
    constructor(
        public id?: number,
        public maHoaChat?: string,
        public tenHoaChat?: string,
        public hangHoaChat?: string,
        public donViTinh?: string,
        public moTa?: string,
        public isDeleted?: boolean,
        public udf1?: string,
        public udf2?: string,
        public udf3?: string,
        public hoaChatTinhSaches?: ITinhSachPhanUng[],
        public hoaChatPhanUngs?: IPCRPhanUng[],
        public hoaChatTachChiets?: IHoaChatTachChiet[]
    ) {
        this.isDeleted = this.isDeleted || false;
    }
}
