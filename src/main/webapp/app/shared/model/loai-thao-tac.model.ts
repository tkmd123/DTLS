import { IMauXetNghiem } from 'app/shared/model//mau-xet-nghiem.model';
import { IThaoTac } from 'app/shared/model//thao-tac.model';
import { ILoaiThaoTac } from 'app/shared/model//loai-thao-tac.model';
import { IPhongBan } from 'app/shared/model//phong-ban.model';

export interface ILoaiThaoTac {
    id?: number;
    maLoaiThaoTac?: string;
    tenLoaiThaoTac?: string;
    moTa?: string;
    isDeleted?: boolean;
    thaoTacHienTais?: IMauXetNghiem[];
    loaiThaoTacs?: IThaoTac[];
    thaoTacTiepTheos?: ILoaiThaoTac[];
    thaoTacTiepTheo?: ILoaiThaoTac;
    phongBan?: IPhongBan;
}

export class LoaiThaoTac implements ILoaiThaoTac {
    constructor(
        public id?: number,
        public maLoaiThaoTac?: string,
        public tenLoaiThaoTac?: string,
        public moTa?: string,
        public isDeleted?: boolean,
        public thaoTacHienTais?: IMauXetNghiem[],
        public loaiThaoTacs?: IThaoTac[],
        public thaoTacTiepTheos?: ILoaiThaoTac[],
        public thaoTacTiepTheo?: ILoaiThaoTac,
        public phongBan?: IPhongBan
    ) {
        this.isDeleted = this.isDeleted || false;
    }
}
