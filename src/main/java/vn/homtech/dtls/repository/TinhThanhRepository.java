package vn.homtech.dtls.repository;

import vn.homtech.dtls.domain.TinhThanh;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TinhThanh entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TinhThanhRepository extends JpaRepository<TinhThanh, Long> {

}
