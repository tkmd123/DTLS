import { IHoaChat } from 'app/shared/model//hoa-chat.model';
import { ITachChiet } from 'app/shared/model//tach-chiet.model';

export interface IHoaChatTachChiet {
    id?: number;
    soLuong?: number;
    moTa?: string;
    isDeleted?: boolean;
    udf1?: string;
    udf2?: string;
    udf3?: string;
    hoaChat?: IHoaChat;
    tachChiet?: ITachChiet;
}

export class HoaChatTachChiet implements IHoaChatTachChiet {
    constructor(
        public id?: number,
        public soLuong?: number,
        public moTa?: string,
        public isDeleted?: boolean,
        public udf1?: string,
        public udf2?: string,
        public udf3?: string,
        public hoaChat?: IHoaChat,
        public tachChiet?: ITachChiet
    ) {
        this.isDeleted = this.isDeleted || false;
    }
}
