package vn.homtech.dtls.repository;

import vn.homtech.dtls.domain.HoSoLietSi;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the HoSoLietSi entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HoSoLietSiRepository extends JpaRepository<HoSoLietSi, Long> {

}
