package vn.homtech.dtls.repository;

import vn.homtech.dtls.domain.DiemDotBien;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DiemDotBien entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DiemDotBienRepository extends JpaRepository<DiemDotBien, Long> {

}
