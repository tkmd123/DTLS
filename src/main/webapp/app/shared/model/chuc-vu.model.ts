import { IHoSoLietSi } from 'app/shared/model//ho-so-liet-si.model';

export interface IChucVu {
    id?: number;
    maChucVu?: string;
    tenChucVu?: string;
    moTa?: string;
    isDeleted?: boolean;
    chucVuLietSis?: IHoSoLietSi[];
}

export class ChucVu implements IChucVu {
    constructor(
        public id?: number,
        public maChucVu?: string,
        public tenChucVu?: string,
        public moTa?: string,
        public isDeleted?: boolean,
        public chucVuLietSis?: IHoSoLietSi[]
    ) {
        this.isDeleted = this.isDeleted || false;
    }
}
