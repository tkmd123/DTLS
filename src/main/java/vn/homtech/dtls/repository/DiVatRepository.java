package vn.homtech.dtls.repository;

import vn.homtech.dtls.domain.DiVat;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DiVat entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DiVatRepository extends JpaRepository<DiVat, Long> {

}
