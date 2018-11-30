package vn.homtech.dtls.repository.search;

import vn.homtech.dtls.domain.TachChiet;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the TachChiet entity.
 */
public interface TachChietSearchRepository extends ElasticsearchRepository<TachChiet, Long> {
}
