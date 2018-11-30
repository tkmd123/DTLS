package vn.homtech.dtls.repository.search;

import vn.homtech.dtls.domain.PhuongXa;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the PhuongXa entity.
 */
public interface PhuongXaSearchRepository extends ElasticsearchRepository<PhuongXa, Long> {
}
