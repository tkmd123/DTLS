import { ITinhSach } from 'app/shared/model//tinh-sach.model';
import { IPCR } from 'app/shared/model//pcr.model';

export interface IMayPCR {
    id?: number;
    maMayPCR?: string;
    tenMayPCR?: string;
    moTa?: string;
    isDeleted?: boolean;
    udf1?: string;
    udf2?: string;
    udf3?: string;
    mayTinhSaches?: ITinhSach[];
    mayPCRS?: IPCR[];
}

export class MayPCR implements IMayPCR {
    constructor(
        public id?: number,
        public maMayPCR?: string,
        public tenMayPCR?: string,
        public moTa?: string,
        public isDeleted?: boolean,
        public udf1?: string,
        public udf2?: string,
        public udf3?: string,
        public mayTinhSaches?: ITinhSach[],
        public mayPCRS?: IPCR[]
    ) {
        this.isDeleted = this.isDeleted || false;
    }
}
