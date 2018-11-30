import { IPCR } from 'app/shared/model//pcr.model';
import { IHoaChat } from 'app/shared/model//hoa-chat.model';

export interface IPCRPhanUng {
    id?: number;
    chuKyPhanUng?: string;
    dungTich?: number;
    isDeleted?: boolean;
    udf1?: string;
    udf2?: string;
    udf3?: string;
    pcrPhanUng?: IPCR;
    hoaChatPhanUng?: IHoaChat;
}

export class PCRPhanUng implements IPCRPhanUng {
    constructor(
        public id?: number,
        public chuKyPhanUng?: string,
        public dungTich?: number,
        public isDeleted?: boolean,
        public udf1?: string,
        public udf2?: string,
        public udf3?: string,
        public pcrPhanUng?: IPCR,
        public hoaChatPhanUng?: IHoaChat
    ) {
        this.isDeleted = this.isDeleted || false;
    }
}
