import { IPCRMau } from 'app/shared/model//pcr-mau.model';

export interface IPCRKetQua {
    id?: number;
    maKetQua?: string;
    tenKetQua?: string;
    isDeleted?: boolean;
    udf1?: string;
    udf2?: string;
    udf3?: string;
    pcrKetQuas?: IPCRMau[];
}

export class PCRKetQua implements IPCRKetQua {
    constructor(
        public id?: number,
        public maKetQua?: string,
        public tenKetQua?: string,
        public isDeleted?: boolean,
        public udf1?: string,
        public udf2?: string,
        public udf3?: string,
        public pcrKetQuas?: IPCRMau[]
    ) {
        this.isDeleted = this.isDeleted || false;
    }
}
