package vn.homtech.dtls.repository.search;

import vn.homtech.dtls.domain.HoSoThanNhan;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the HoSoThanNhan entity.
 */
public interface HoSoThanNhanSearchRepository extends ElasticsearchRepository<HoSoThanNhan, Long> {
}
