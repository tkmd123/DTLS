package vn.homtech.dtls.repository.search;

import vn.homtech.dtls.domain.TinhThanh;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the TinhThanh entity.
 */
public interface TinhThanhSearchRepository extends ElasticsearchRepository<TinhThanh, Long> {
}
