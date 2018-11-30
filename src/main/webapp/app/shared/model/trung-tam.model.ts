import { IPhongBan } from 'app/shared/model//phong-ban.model';

export interface ITrungTam {
    id?: number;
    maTrungTam?: string;
    tenTrungTam?: string;
    moTa?: string;
    isDeleted?: boolean;
    udf1?: string;
    udf2?: string;
    udf3?: string;
    trungtams?: IPhongBan[];
}

export class TrungTam implements ITrungTam {
    constructor(
        public id?: number,
        public maTrungTam?: string,
        public tenTrungTam?: string,
        public moTa?: string,
        public isDeleted?: boolean,
        public udf1?: string,
        public udf2?: string,
        public udf3?: string,
        public trungtams?: IPhongBan[]
    ) {
        this.isDeleted = this.isDeleted || false;
    }
}
