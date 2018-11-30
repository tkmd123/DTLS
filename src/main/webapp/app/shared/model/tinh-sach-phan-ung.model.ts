import { ITinhSach } from 'app/shared/model//tinh-sach.model';
import { IHoaChat } from 'app/shared/model//hoa-chat.model';

export interface ITinhSachPhanUng {
    id?: number;
    dungTichSuDung?: number;
    chuTrinhNhietDo?: string;
    isDeleted?: boolean;
    udf1?: string;
    udf2?: string;
    udf3?: string;
    tinhSach?: ITinhSach;
    hoaChatTinhSach?: IHoaChat;
}

export class TinhSachPhanUng implements ITinhSachPhanUng {
    constructor(
        public id?: number,
        public dungTichSuDung?: number,
        public chuTrinhNhietDo?: string,
        public isDeleted?: boolean,
        public udf1?: string,
        public udf2?: string,
        public udf3?: string,
        public tinhSach?: ITinhSach,
        public hoaChatTinhSach?: IHoaChat
    ) {
        this.isDeleted = this.isDeleted || false;
    }
}
