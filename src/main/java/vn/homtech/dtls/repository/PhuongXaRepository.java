package vn.homtech.dtls.repository;

import vn.homtech.dtls.domain.PhuongXa;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PhuongXa entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PhuongXaRepository extends JpaRepository<PhuongXa, Long> {

}
