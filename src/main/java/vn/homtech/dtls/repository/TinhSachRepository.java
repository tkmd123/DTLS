package vn.homtech.dtls.repository;

import vn.homtech.dtls.domain.TinhSach;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TinhSach entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TinhSachRepository extends JpaRepository<TinhSach, Long> {

}
