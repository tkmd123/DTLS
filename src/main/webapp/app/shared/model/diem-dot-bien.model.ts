import { IVungADN } from 'app/shared/model//vung-adn.model';
import { IThongTinADN } from 'app/shared/model//thong-tin-adn.model';

export interface IDiemDotBien {
    id?: number;
    viTri?: number;
    giaTri?: string;
    giaTri1?: string;
    giaTri2?: string;
    isDeleted?: boolean;
    vungADN?: IVungADN;
    thongTinADN?: IThongTinADN;
}

export class DiemDotBien implements IDiemDotBien {
    constructor(
        public id?: number,
        public viTri?: number,
        public giaTri?: string,
        public giaTri1?: string,
        public giaTri2?: string,
        public isDeleted?: boolean,
        public vungADN?: IVungADN,
        public thongTinADN?: IThongTinADN
    ) {
        this.isDeleted = this.isDeleted || false;
    }
}
