package vn.homtech.dtls.repository.search;

import vn.homtech.dtls.domain.DiVat;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the DiVat entity.
 */
public interface DiVatSearchRepository extends ElasticsearchRepository<DiVat, Long> {
}
