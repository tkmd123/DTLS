import { IQuanHuyen } from 'app/shared/model//quan-huyen.model';

export interface ITinhThanh {
    id?: number;
    maTinh?: string;
    tenTinh?: string;
    moTa?: string;
    isDeleted?: boolean;
    udf1?: string;
    udf2?: string;
    udf3?: string;
    tinhThanhQuanHuyens?: IQuanHuyen[];
}

export class TinhThanh implements ITinhThanh {
    constructor(
        public id?: number,
        public maTinh?: string,
        public tenTinh?: string,
        public moTa?: string,
        public isDeleted?: boolean,
        public udf1?: string,
        public udf2?: string,
        public udf3?: string,
        public tinhThanhQuanHuyens?: IQuanHuyen[]
    ) {
        this.isDeleted = this.isDeleted || false;
    }
}
