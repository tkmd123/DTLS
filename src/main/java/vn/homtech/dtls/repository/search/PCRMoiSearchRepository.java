package vn.homtech.dtls.repository.search;

import vn.homtech.dtls.domain.PCRMoi;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the PCRMoi entity.
 */
public interface PCRMoiSearchRepository extends ElasticsearchRepository<PCRMoi, Long> {
}
