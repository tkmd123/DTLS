package vn.homtech.dtls.repository;

import vn.homtech.dtls.domain.VungADN;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the VungADN entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VungADNRepository extends JpaRepository<VungADN, Long> {

}