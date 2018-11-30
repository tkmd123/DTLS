package vn.homtech.dtls.repository;

import vn.homtech.dtls.domain.TrungTam;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TrungTam entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TrungTamRepository extends JpaRepository<TrungTam, Long> {

}
