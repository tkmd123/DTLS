package vn.homtech.dtls.repository.search;

import vn.homtech.dtls.domain.HoaChat;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the HoaChat entity.
 */
public interface HoaChatSearchRepository extends ElasticsearchRepository<HoaChat, Long> {
}
