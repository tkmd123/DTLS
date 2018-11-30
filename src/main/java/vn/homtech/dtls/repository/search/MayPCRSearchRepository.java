package vn.homtech.dtls.repository.search;

import vn.homtech.dtls.domain.MayPCR;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the MayPCR entity.
 */
public interface MayPCRSearchRepository extends ElasticsearchRepository<MayPCR, Long> {
}
