export interface IPCRPhanUngChuan {
    id?: number;
    chuKyPhanUng?: string;
    isDeleted?: boolean;
    udf1?: string;
    udf2?: string;
    udf3?: string;
}

export class PCRPhanUngChuan implements IPCRPhanUngChuan {
    constructor(
        public id?: number,
        public chuKyPhanUng?: string,
        public isDeleted?: boolean,
        public udf1?: string,
        public udf2?: string,
        public udf3?: string
    ) {
        this.isDeleted = this.isDeleted || false;
    }
}
