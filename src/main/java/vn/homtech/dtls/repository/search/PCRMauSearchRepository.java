package vn.homtech.dtls.repository.search;

import vn.homtech.dtls.domain.PCRMau;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the PCRMau entity.
 */
public interface PCRMauSearchRepository extends ElasticsearchRepository<PCRMau, Long> {
}
