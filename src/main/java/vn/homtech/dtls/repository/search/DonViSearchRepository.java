package vn.homtech.dtls.repository.search;

import vn.homtech.dtls.domain.DonVi;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the DonVi entity.
 */
public interface DonViSearchRepository extends ElasticsearchRepository<DonVi, Long> {
}
