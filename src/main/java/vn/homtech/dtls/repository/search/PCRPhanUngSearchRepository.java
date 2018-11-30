package vn.homtech.dtls.repository.search;

import vn.homtech.dtls.domain.PCRPhanUng;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the PCRPhanUng entity.
 */
public interface PCRPhanUngSearchRepository extends ElasticsearchRepository<PCRPhanUng, Long> {
}
