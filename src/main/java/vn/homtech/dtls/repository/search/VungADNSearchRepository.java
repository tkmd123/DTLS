package vn.homtech.dtls.repository.search;

import vn.homtech.dtls.domain.VungADN;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the VungADN entity.
 */
public interface VungADNSearchRepository extends ElasticsearchRepository<VungADN, Long> {
}
