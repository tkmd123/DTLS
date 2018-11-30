import { IDonVi } from 'app/shared/model//don-vi.model';

export interface IDonViThoiKy {
    id?: number;
    tuNam?: number;
    denNam?: number;
    diaDiemMoTa?: string;
    diaDiemXa?: string;
    diaDiemHuyen?: string;
    diaDiemTinh?: string;
    isDeleted?: boolean;
    udf1?: string;
    udf2?: string;
    udf3?: string;
    donVi?: IDonVi;
}

export class DonViThoiKy implements IDonViThoiKy {
    constructor(
        public id?: number,
        public tuNam?: number,
        public denNam?: number,
        public diaDiemMoTa?: string,
        public diaDiemXa?: string,
        public diaDiemHuyen?: string,
        public diaDiemTinh?: string,
        public isDeleted?: boolean,
        public udf1?: string,
        public udf2?: string,
        public udf3?: string,
        public donVi?: IDonVi
    ) {
        this.isDeleted = this.isDeleted || false;
    }
}
