package vn.homtech.dtls.repository;

import vn.homtech.dtls.domain.MauXetNghiem;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the MauXetNghiem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MauXetNghiemRepository extends JpaRepository<MauXetNghiem, Long> {

}
