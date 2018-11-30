import { IVungADN } from 'app/shared/model//vung-adn.model';
import { IMauXetNghiem } from 'app/shared/model//mau-xet-nghiem.model';

export interface IDiemDotBien {
    id?: number;
    viTri?: number;
    giaTri?: string;
    isDeleted?: boolean;
    udf1?: string;
    udf2?: string;
    udf3?: string;
    vungADN?: IVungADN;
    mauDiemDotBien?: IMauXetNghiem;
}

export class DiemDotBien implements IDiemDotBien {
    constructor(
        public id?: number,
        public viTri?: number,
        public giaTri?: string,
        public isDeleted?: boolean,
        public udf1?: string,
        public udf2?: string,
        public udf3?: string,
        public vungADN?: IVungADN,
        public mauDiemDotBien?: IMauXetNghiem
    ) {
        this.isDeleted = this.isDeleted || false;
    }
}
