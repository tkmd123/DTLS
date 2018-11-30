export interface IHoaChatMacDinh {
    id?: number;
    loaiThaoTac?: string;
    isDefault?: boolean;
    isDeleted?: boolean;
    udf1?: string;
    udf2?: string;
    udf3?: string;
}

export class HoaChatMacDinh implements IHoaChatMacDinh {
    constructor(
        public id?: number,
        public loaiThaoTac?: string,
        public isDefault?: boolean,
        public isDeleted?: boolean,
        public udf1?: string,
        public udf2?: string,
        public udf3?: string
    ) {
        this.isDefault = this.isDefault || false;
        this.isDeleted = this.isDeleted || false;
    }
}
