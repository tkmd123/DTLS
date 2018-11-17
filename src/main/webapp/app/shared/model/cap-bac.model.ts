import { IHoSoLietSi } from 'app/shared/model//ho-so-liet-si.model';

export interface ICapBac {
    id?: number;
    maCapBac?: string;
    tenCapBac?: string;
    moTa?: string;
    isDeleted?: boolean;
    capBacLietSis?: IHoSoLietSi[];
}

export class CapBac implements ICapBac {
    constructor(
        public id?: number,
        public maCapBac?: string,
        public tenCapBac?: string,
        public moTa?: string,
        public isDeleted?: boolean,
        public capBacLietSis?: IHoSoLietSi[]
    ) {
        this.isDeleted = this.isDeleted || false;
    }
}
