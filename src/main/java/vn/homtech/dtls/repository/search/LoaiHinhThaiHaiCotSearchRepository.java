package vn.homtech.dtls.repository.search;

import vn.homtech.dtls.domain.LoaiHinhThaiHaiCot;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the LoaiHinhThaiHaiCot entity.
 */
public interface LoaiHinhThaiHaiCotSearchRepository extends ElasticsearchRepository<LoaiHinhThaiHaiCot, Long> {
}
