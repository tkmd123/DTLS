import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DtlsTinhThanhModule } from './tinh-thanh/tinh-thanh.module';
import { DtlsQuanHuyenModule } from './quan-huyen/quan-huyen.module';
import { DtlsPhuongXaModule } from './phuong-xa/phuong-xa.module';
import { DtlsCapBacModule } from './cap-bac/cap-bac.module';
import { DtlsChucVuModule } from './chuc-vu/chuc-vu.module';
import { DtlsHoSoGiamDinhModule } from './ho-so-giam-dinh/ho-so-giam-dinh.module';
import { DtlsHoSoLietSiModule } from './ho-so-liet-si/ho-so-liet-si.module';
import { DtlsDonViModule } from './don-vi/don-vi.module';
import { DtlsDonViThoiKyModule } from './don-vi-thoi-ky/don-vi-thoi-ky.module';
import { DtlsQuanHeThanNhanModule } from './quan-he-than-nhan/quan-he-than-nhan.module';
import { DtlsHoSoThanNhanModule } from './ho-so-than-nhan/ho-so-than-nhan.module';
import { DtlsThanNhanLietSiModule } from './than-nhan-liet-si/than-nhan-liet-si.module';
import { DtlsThongTinMoModule } from './thong-tin-mo/thong-tin-mo.module';
import { DtlsNghiaTrangModule } from './nghia-trang/nghia-trang.module';
import { DtlsThongTinKhaiQuatModule } from './thong-tin-khai-quat/thong-tin-khai-quat.module';
import { DtlsLoaiDiVatModule } from './loai-di-vat/loai-di-vat.module';
import { DtlsDiVatModule } from './di-vat/di-vat.module';
import { DtlsLoaiHinhThaiHaiCotModule } from './loai-hinh-thai-hai-cot/loai-hinh-thai-hai-cot.module';
import { DtlsHaiCotLietSiModule } from './hai-cot-liet-si/hai-cot-liet-si.module';
import { DtlsHinhThaiHaiCotModule } from './hinh-thai-hai-cot/hinh-thai-hai-cot.module';
import { DtlsLoaiMauXetNghiemModule } from './loai-mau-xet-nghiem/loai-mau-xet-nghiem.module';
import { DtlsMauXetNghiemModule } from './mau-xet-nghiem/mau-xet-nghiem.module';
import { DtlsHoaChatModule } from './hoa-chat/hoa-chat.module';
import { DtlsHoaChatMacDinhModule } from './hoa-chat-mac-dinh/hoa-chat-mac-dinh.module';
import { DtlsTachChietModule } from './tach-chiet/tach-chiet.module';
import { DtlsHoaChatTachChietModule } from './hoa-chat-tach-chiet/hoa-chat-tach-chiet.module';
import { DtlsMauTachChietModule } from './mau-tach-chiet/mau-tach-chiet.module';
import { DtlsMayPCRModule } from './may-pcr/may-pcr.module';
import { DtlsPCRMoiModule } from './pcr-moi/pcr-moi.module';
import { DtlsPCRModule } from './pcr/pcr.module';
import { DtlsPCRPhanUngChuanModule } from './pcr-phan-ung-chuan/pcr-phan-ung-chuan.module';
import { DtlsPCRPhanUngModule } from './pcr-phan-ung/pcr-phan-ung.module';
import { DtlsPCRMauModule } from './pcr-mau/pcr-mau.module';
import { DtlsPCRKetQuaModule } from './pcr-ket-qua/pcr-ket-qua.module';
import { DtlsTinhSachModule } from './tinh-sach/tinh-sach.module';
import { DtlsTinhSachPhanUngModule } from './tinh-sach-phan-ung/tinh-sach-phan-ung.module';
import { DtlsVungADNModule } from './vung-adn/vung-adn.module';
import { DtlsMappingDotBienModule } from './mapping-dot-bien/mapping-dot-bien.module';
import { DtlsDiemDotBienModule } from './diem-dot-bien/diem-dot-bien.module';
import { DtlsLoaiThaoTacModule } from './loai-thao-tac/loai-thao-tac.module';
import { DtlsThaoTacModule } from './thao-tac/thao-tac.module';
import { DtlsTrungTamModule } from './trung-tam/trung-tam.module';
import { DtlsPhongBanModule } from './phong-ban/phong-ban.module';
import { DtlsNhanVienModule } from './nhan-vien/nhan-vien.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        DtlsTinhThanhModule,
        DtlsQuanHuyenModule,
        DtlsPhuongXaModule,
        DtlsCapBacModule,
        DtlsChucVuModule,
        DtlsHoSoGiamDinhModule,
        DtlsHoSoLietSiModule,
        DtlsDonViModule,
        DtlsDonViThoiKyModule,
        DtlsQuanHeThanNhanModule,
        DtlsHoSoThanNhanModule,
        DtlsThanNhanLietSiModule,
        DtlsThongTinMoModule,
        DtlsNghiaTrangModule,
        DtlsThongTinKhaiQuatModule,
        DtlsLoaiDiVatModule,
        DtlsDiVatModule,
        DtlsLoaiHinhThaiHaiCotModule,
        DtlsHaiCotLietSiModule,
        DtlsHinhThaiHaiCotModule,
        DtlsLoaiMauXetNghiemModule,
        DtlsMauXetNghiemModule,
        DtlsHoaChatModule,
        DtlsHoaChatMacDinhModule,
        DtlsTachChietModule,
        DtlsHoaChatTachChietModule,
        DtlsMauTachChietModule,
        DtlsMayPCRModule,
        DtlsPCRMoiModule,
        DtlsPCRModule,
        DtlsPCRPhanUngChuanModule,
        DtlsPCRPhanUngModule,
        DtlsPCRMauModule,
        DtlsPCRKetQuaModule,
        DtlsTinhSachModule,
        DtlsTinhSachPhanUngModule,
        DtlsVungADNModule,
        DtlsMappingDotBienModule,
        DtlsDiemDotBienModule,
        DtlsLoaiThaoTacModule,
        DtlsThaoTacModule,
        DtlsTrungTamModule,
        DtlsPhongBanModule,
        DtlsNhanVienModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DtlsEntityModule {}
