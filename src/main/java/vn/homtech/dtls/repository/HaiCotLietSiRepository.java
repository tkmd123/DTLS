package vn.homtech.dtls.repository;

import vn.homtech.dtls.domain.HaiCotLietSi;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the HaiCotLietSi entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HaiCotLietSiRepository extends JpaRepository<HaiCotLietSi, Long> {

}
