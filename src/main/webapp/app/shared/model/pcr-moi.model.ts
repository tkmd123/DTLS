import { IPCRMau } from 'app/shared/model//pcr-mau.model';

export interface IPCRMoi {
    id?: number;
    maMoi?: string;
    tenMoi?: string;
    moTa?: string;
    isDeleted?: boolean;
    udf1?: string;
    udf2?: string;
    udf3?: string;
    moiPCRS?: IPCRMau[];
}

export class PCRMoi implements IPCRMoi {
    constructor(
        public id?: number,
        public maMoi?: string,
        public tenMoi?: string,
        public moTa?: string,
        public isDeleted?: boolean,
        public udf1?: string,
        public udf2?: string,
        public udf3?: string,
        public moiPCRS?: IPCRMau[]
    ) {
        this.isDeleted = this.isDeleted || false;
    }
}
