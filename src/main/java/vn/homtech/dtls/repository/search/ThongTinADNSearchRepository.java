package vn.homtech.dtls.repository.search;

import vn.homtech.dtls.domain.ThongTinADN;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ThongTinADN entity.
 */
public interface ThongTinADNSearchRepository extends ElasticsearchRepository<ThongTinADN, Long> {
}
