package vn.homtech.dtls.repository;

import vn.homtech.dtls.domain.QuanHuyen;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the QuanHuyen entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QuanHuyenRepository extends JpaRepository<QuanHuyen, Long> {

}
