package vn.homtech.dtls.repository.search;

import vn.homtech.dtls.domain.HinhThaiHaiCot;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the HinhThaiHaiCot entity.
 */
public interface HinhThaiHaiCotSearchRepository extends ElasticsearchRepository<HinhThaiHaiCot, Long> {
}
