import { IHoSoLietSi } from 'app/shared/model//ho-so-liet-si.model';

export interface ICapBac {
    id?: number;
    maCapBac?: string;
    tenCapBac?: string;
    moTa?: string;
    isDeleted?: boolean;
    udf1?: string;
    udf2?: string;
    udf3?: string;
    capBacLietSis?: IHoSoLietSi[];
}

export class CapBac implements ICapBac {
    constructor(
        public id?: number,
        public maCapBac?: string,
        public tenCapBac?: string,
        public moTa?: string,
        public isDeleted?: boolean,
        public udf1?: string,
        public udf2?: string,
        public udf3?: string,
        public capBacLietSis?: IHoSoLietSi[]
    ) {
        this.isDeleted = this.isDeleted || false;
    }
}
