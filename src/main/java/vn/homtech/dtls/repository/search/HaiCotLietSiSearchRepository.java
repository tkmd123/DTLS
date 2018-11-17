package vn.homtech.dtls.repository.search;

import vn.homtech.dtls.domain.HaiCotLietSi;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the HaiCotLietSi entity.
 */
public interface HaiCotLietSiSearchRepository extends ElasticsearchRepository<HaiCotLietSi, Long> {
}
