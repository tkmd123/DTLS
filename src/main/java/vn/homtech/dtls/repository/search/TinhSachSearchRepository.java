package vn.homtech.dtls.repository.search;

import vn.homtech.dtls.domain.TinhSach;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the TinhSach entity.
 */
public interface TinhSachSearchRepository extends ElasticsearchRepository<TinhSach, Long> {
}
