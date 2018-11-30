import { IThanNhanLietSi } from 'app/shared/model//than-nhan-liet-si.model';

export interface IQuanHeThanNhan {
    id?: number;
    maQuanHe?: string;
    loaiQuanHe?: string;
    moTa?: string;
    isDeleted?: boolean;
    udf1?: string;
    udf2?: string;
    udf3?: string;
    quanHeThanNhans?: IThanNhanLietSi[];
}

export class QuanHeThanNhan implements IQuanHeThanNhan {
    constructor(
        public id?: number,
        public maQuanHe?: string,
        public loaiQuanHe?: string,
        public moTa?: string,
        public isDeleted?: boolean,
        public udf1?: string,
        public udf2?: string,
        public udf3?: string,
        public quanHeThanNhans?: IThanNhanLietSi[]
    ) {
        this.isDeleted = this.isDeleted || false;
    }
}
