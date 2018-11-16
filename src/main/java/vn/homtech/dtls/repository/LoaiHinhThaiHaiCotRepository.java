package vn.homtech.dtls.repository;

import vn.homtech.dtls.domain.LoaiHinhThaiHaiCot;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the LoaiHinhThaiHaiCot entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LoaiHinhThaiHaiCotRepository extends JpaRepository<LoaiHinhThaiHaiCot, Long> {

}
