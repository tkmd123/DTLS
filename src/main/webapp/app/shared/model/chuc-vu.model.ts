import { IHoSoLietSi } from 'app/shared/model//ho-so-liet-si.model';

export interface IChucVu {
    id?: number;
    maChucVu?: string;
    tenChucVu?: string;
    moTa?: string;
    isDeleted?: boolean;
    udf1?: string;
    udf2?: string;
    udf3?: string;
    chucVuLietSis?: IHoSoLietSi[];
}

export class ChucVu implements IChucVu {
    constructor(
        public id?: number,
        public maChucVu?: string,
        public tenChucVu?: string,
        public moTa?: string,
        public isDeleted?: boolean,
        public udf1?: string,
        public udf2?: string,
        public udf3?: string,
        public chucVuLietSis?: IHoSoLietSi[]
    ) {
        this.isDeleted = this.isDeleted || false;
    }
}
