package vn.homtech.dtls.repository.search;

import vn.homtech.dtls.domain.PCRKetQua;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the PCRKetQua entity.
 */
public interface PCRKetQuaSearchRepository extends ElasticsearchRepository<PCRKetQua, Long> {
}
