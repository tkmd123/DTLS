import { INhanVien } from 'app/shared/model//nhan-vien.model';
import { IThaoTac } from 'app/shared/model//thao-tac.model';
import { ILoaiThaoTac } from 'app/shared/model//loai-thao-tac.model';
import { ITrungTam } from 'app/shared/model//trung-tam.model';

export interface IPhongBan {
    id?: number;
    maPhongBan?: string;
    tenPhongBan?: string;
    moTa?: string;
    isActive?: boolean;
    isDeleted?: boolean;
    udf1?: string;
    udf2?: string;
    udf3?: string;
    phongbans?: INhanVien[];
    phongLabPhanTiches?: IThaoTac[];
    phongBanThaoTacs?: ILoaiThaoTac[];
    trungtam?: ITrungTam;
}

export class PhongBan implements IPhongBan {
    constructor(
        public id?: number,
        public maPhongBan?: string,
        public tenPhongBan?: string,
        public moTa?: string,
        public isActive?: boolean,
        public isDeleted?: boolean,
        public udf1?: string,
        public udf2?: string,
        public udf3?: string,
        public phongbans?: INhanVien[],
        public phongLabPhanTiches?: IThaoTac[],
        public phongBanThaoTacs?: ILoaiThaoTac[],
        public trungtam?: ITrungTam
    ) {
        this.isActive = this.isActive || false;
        this.isDeleted = this.isDeleted || false;
    }
}
