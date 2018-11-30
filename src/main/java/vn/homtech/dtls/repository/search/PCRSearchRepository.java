package vn.homtech.dtls.repository.search;

import vn.homtech.dtls.domain.PCR;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the PCR entity.
 */
public interface PCRSearchRepository extends ElasticsearchRepository<PCR, Long> {
}
