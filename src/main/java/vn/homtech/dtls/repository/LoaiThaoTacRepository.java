package vn.homtech.dtls.repository;

import vn.homtech.dtls.domain.LoaiThaoTac;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the LoaiThaoTac entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LoaiThaoTacRepository extends JpaRepository<LoaiThaoTac, Long> {

}
