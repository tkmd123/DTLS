package vn.homtech.dtls.repository.search;

import vn.homtech.dtls.domain.HoaChatMacDinh;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the HoaChatMacDinh entity.
 */
public interface HoaChatMacDinhSearchRepository extends ElasticsearchRepository<HoaChatMacDinh, Long> {
}
