package vn.homtech.dtls.repository.search;

import vn.homtech.dtls.domain.HoSoLietSi;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the HoSoLietSi entity.
 */
public interface HoSoLietSiSearchRepository extends ElasticsearchRepository<HoSoLietSi, Long> {
}
