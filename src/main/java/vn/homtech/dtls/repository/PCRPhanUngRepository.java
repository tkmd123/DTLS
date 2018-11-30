package vn.homtech.dtls.repository;

import vn.homtech.dtls.domain.PCRPhanUng;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PCRPhanUng entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PCRPhanUngRepository extends JpaRepository<PCRPhanUng, Long> {

}
