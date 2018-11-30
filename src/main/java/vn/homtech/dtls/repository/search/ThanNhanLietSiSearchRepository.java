package vn.homtech.dtls.repository.search;

import vn.homtech.dtls.domain.ThanNhanLietSi;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ThanNhanLietSi entity.
 */
public interface ThanNhanLietSiSearchRepository extends ElasticsearchRepository<ThanNhanLietSi, Long> {
}
