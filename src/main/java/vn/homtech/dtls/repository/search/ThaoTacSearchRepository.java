package vn.homtech.dtls.repository.search;

import vn.homtech.dtls.domain.ThaoTac;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ThaoTac entity.
 */
public interface ThaoTacSearchRepository extends ElasticsearchRepository<ThaoTac, Long> {
}
