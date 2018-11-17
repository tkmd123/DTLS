import { IQuanHuyen } from 'app/shared/model//quan-huyen.model';

export interface ITinhThanh {
    id?: number;
    maTinh?: string;
    tenTinh?: string;
    moTa?: string;
    tinhThanhQuanHuyens?: IQuanHuyen[];
}

export class TinhThanh implements ITinhThanh {
    constructor(
        public id?: number,
        public maTinh?: string,
        public tenTinh?: string,
        public moTa?: string,
        public tinhThanhQuanHuyens?: IQuanHuyen[]
    ) {}
}
