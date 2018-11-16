package vn.homtech.dtls.repository;

import vn.homtech.dtls.domain.HoSoThanNhan;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the HoSoThanNhan entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HoSoThanNhanRepository extends JpaRepository<HoSoThanNhan, Long> {

}
