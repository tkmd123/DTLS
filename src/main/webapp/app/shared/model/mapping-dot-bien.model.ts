export interface IMappingDotBien {
    id?: number;
    maDotBien?: string;
    maMapping?: string;
    isDeleted?: boolean;
    udf1?: string;
    udf2?: string;
    udf3?: string;
}

export class MappingDotBien implements IMappingDotBien {
    constructor(
        public id?: number,
        public maDotBien?: string,
        public maMapping?: string,
        public isDeleted?: boolean,
        public udf1?: string,
        public udf2?: string,
        public udf3?: string
    ) {
        this.isDeleted = this.isDeleted || false;
    }
}
