import { IDiemDotBien } from 'app/shared/model//diem-dot-bien.model';

export interface IThongTinADN {
    id?: number;
    moTa?: string;
    fileDuLieu?: string;
    isDeleted?: boolean;
    thongTinADNDotBiens?: IDiemDotBien[];
}

export class ThongTinADN implements IThongTinADN {
    constructor(
        public id?: number,
        public moTa?: string,
        public fileDuLieu?: string,
        public isDeleted?: boolean,
        public thongTinADNDotBiens?: IDiemDotBien[]
    ) {
        this.isDeleted = this.isDeleted || false;
    }
}
