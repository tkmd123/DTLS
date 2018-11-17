import { IDiemDotBien } from 'app/shared/model//diem-dot-bien.model';

export interface IVungADN {
    id?: number;
    maVungADN?: string;
    tenVungADN?: string;
    moTa?: string;
    isDeleted?: boolean;
    vungADNS?: IDiemDotBien[];
}

export class VungADN implements IVungADN {
    constructor(
        public id?: number,
        public maVungADN?: string,
        public tenVungADN?: string,
        public moTa?: string,
        public isDeleted?: boolean,
        public vungADNS?: IDiemDotBien[]
    ) {
        this.isDeleted = this.isDeleted || false;
    }
}
