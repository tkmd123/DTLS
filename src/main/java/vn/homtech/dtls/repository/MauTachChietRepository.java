package vn.homtech.dtls.repository;

import vn.homtech.dtls.domain.MauTachChiet;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the MauTachChiet entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MauTachChietRepository extends JpaRepository<MauTachChiet, Long> {

}
