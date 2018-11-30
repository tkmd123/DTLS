package vn.homtech.dtls.repository.search;

import vn.homtech.dtls.domain.LoaiThaoTac;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the LoaiThaoTac entity.
 */
public interface LoaiThaoTacSearchRepository extends ElasticsearchRepository<LoaiThaoTac, Long> {
}
