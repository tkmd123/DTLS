package vn.homtech.dtls.repository;

import vn.homtech.dtls.domain.ThaoTac;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ThaoTac entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ThaoTacRepository extends JpaRepository<ThaoTac, Long> {

}
