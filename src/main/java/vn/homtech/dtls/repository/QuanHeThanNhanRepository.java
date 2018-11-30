package vn.homtech.dtls.repository;

import vn.homtech.dtls.domain.QuanHeThanNhan;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the QuanHeThanNhan entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QuanHeThanNhanRepository extends JpaRepository<QuanHeThanNhan, Long> {

}
