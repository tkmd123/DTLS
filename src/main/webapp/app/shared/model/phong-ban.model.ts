import { IThaoTac } from 'app/shared/model//thao-tac.model';
import { ILoaiThaoTac } from 'app/shared/model//loai-thao-tac.model';

export interface IPhongBan {
    id?: number;
    maPhongBan?: string;
    tenPhongBan?: string;
    moTa?: string;
    isActive?: boolean;
    isDeleted?: boolean;
    phongLabPhanTiches?: IThaoTac[];
    phongBanThaoTacs?: ILoaiThaoTac[];
}

export class PhongBan implements IPhongBan {
    constructor(
        public id?: number,
        public maPhongBan?: string,
        public tenPhongBan?: string,
        public moTa?: string,
        public isActive?: boolean,
        public isDeleted?: boolean,
        public phongLabPhanTiches?: IThaoTac[],
        public phongBanThaoTacs?: ILoaiThaoTac[]
    ) {
        this.isActive = this.isActive || false;
        this.isDeleted = this.isDeleted || false;
    }
}
