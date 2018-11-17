package vn.homtech.dtls.repository;

import vn.homtech.dtls.domain.LoaiMauXetNghiem;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the LoaiMauXetNghiem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LoaiMauXetNghiemRepository extends JpaRepository<LoaiMauXetNghiem, Long> {

}
