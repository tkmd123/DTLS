package vn.homtech.dtls.repository;

import vn.homtech.dtls.domain.LoaiDiVat;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the LoaiDiVat entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LoaiDiVatRepository extends JpaRepository<LoaiDiVat, Long> {

}
