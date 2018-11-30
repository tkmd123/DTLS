package vn.homtech.dtls.repository;

import vn.homtech.dtls.domain.PCRPhanUngChuan;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PCRPhanUngChuan entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PCRPhanUngChuanRepository extends JpaRepository<PCRPhanUngChuan, Long> {

}
