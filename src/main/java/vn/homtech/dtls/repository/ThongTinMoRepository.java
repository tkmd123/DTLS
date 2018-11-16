package vn.homtech.dtls.repository;

import vn.homtech.dtls.domain.ThongTinMo;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ThongTinMo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ThongTinMoRepository extends JpaRepository<ThongTinMo, Long> {

}
