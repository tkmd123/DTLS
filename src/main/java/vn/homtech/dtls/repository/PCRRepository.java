package vn.homtech.dtls.repository;

import vn.homtech.dtls.domain.PCR;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PCR entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PCRRepository extends JpaRepository<PCR, Long> {

}
