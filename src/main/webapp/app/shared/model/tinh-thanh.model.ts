import { IQuanHuyen } from 'app/shared/model//quan-huyen.model';

export interface ITinhThanh {
    id?: number;
    tinhThanhQuanHuyens?: IQuanHuyen[];
}

export class TinhThanh implements ITinhThanh {
    constructor(public id?: number, public tinhThanhQuanHuyens?: IQuanHuyen[]) {}
}
