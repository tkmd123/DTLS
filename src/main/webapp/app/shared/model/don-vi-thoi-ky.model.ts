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
    ghiChu?: string;
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
        public ghiChu?: string,
        public donVi?: IDonVi
    ) {
        this.isDeleted = this.isDeleted || false;
    }
}
