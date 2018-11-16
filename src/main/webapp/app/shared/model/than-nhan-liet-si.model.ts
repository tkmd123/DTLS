import { IHoSoLietSi } from 'app/shared/model//ho-so-liet-si.model';
import { IQuanHeThanNhan } from 'app/shared/model//quan-he-than-nhan.model';
import { IHoSoThanNhan } from 'app/shared/model//ho-so-than-nhan.model';

export interface IThanNhanLietSi {
    id?: number;
    moTa?: string;
    isDeleted?: boolean;
    hoSoLietSi?: IHoSoLietSi;
    quanHeThanNhan?: IQuanHeThanNhan;
    hoSoThanNhan?: IHoSoThanNhan;
}

export class ThanNhanLietSi implements IThanNhanLietSi {
    constructor(
        public id?: number,
        public moTa?: string,
        public isDeleted?: boolean,
        public hoSoLietSi?: IHoSoLietSi,
        public quanHeThanNhan?: IQuanHeThanNhan,
        public hoSoThanNhan?: IHoSoThanNhan
    ) {
        this.isDeleted = this.isDeleted || false;
    }
}
