package vn.homtech.dtls.repository.search;

import vn.homtech.dtls.domain.HoaChatTachChiet;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the HoaChatTachChiet entity.
 */
public interface HoaChatTachChietSearchRepository extends ElasticsearchRepository<HoaChatTachChiet, Long> {
}
