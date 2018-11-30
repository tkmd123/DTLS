package vn.homtech.dtls.repository.search;

import vn.homtech.dtls.domain.ChucVu;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ChucVu entity.
 */
public interface ChucVuSearchRepository extends ElasticsearchRepository<ChucVu, Long> {
}
