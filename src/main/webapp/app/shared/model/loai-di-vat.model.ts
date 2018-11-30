import { IDiVat } from 'app/shared/model//di-vat.model';

export interface ILoaiDiVat {
    id?: number;
    maDiVat?: string;
    loaiDiVat?: string;
    moTa?: string;
    isDeleted?: boolean;
    udf1?: string;
    udf2?: string;
    udf3?: string;
    loaiDiVats?: IDiVat[];
}

export class LoaiDiVat implements ILoaiDiVat {
    constructor(
        public id?: number,
        public maDiVat?: string,
        public loaiDiVat?: string,
        public moTa?: string,
        public isDeleted?: boolean,
        public udf1?: string,
        public udf2?: string,
        public udf3?: string,
        public loaiDiVats?: IDiVat[]
    ) {
        this.isDeleted = this.isDeleted || false;
    }
}
