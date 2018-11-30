package vn.homtech.dtls.repository;

import vn.homtech.dtls.domain.TinhSachPhanUng;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TinhSachPhanUng entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TinhSachPhanUngRepository extends JpaRepository<TinhSachPhanUng, Long> {

}
