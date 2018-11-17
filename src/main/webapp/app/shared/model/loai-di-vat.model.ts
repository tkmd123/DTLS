import { IDiVat } from 'app/shared/model//di-vat.model';

export interface ILoaiDiVat {
    id?: number;
    maDiVat?: string;
    loaiDiVat?: string;
    moTa?: string;
    isDeleted?: boolean;
    loaiDiVats?: IDiVat[];
}

export class LoaiDiVat implements ILoaiDiVat {
    constructor(
        public id?: number,
        public maDiVat?: string,
        public loaiDiVat?: string,
        public moTa?: string,
        public isDeleted?: boolean,
        public loaiDiVats?: IDiVat[]
    ) {
        this.isDeleted = this.isDeleted || false;
    }
}
