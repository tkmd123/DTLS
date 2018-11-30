package vn.homtech.dtls.repository.search;

import vn.homtech.dtls.domain.HoSoGiamDinh;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the HoSoGiamDinh entity.
 */
public interface HoSoGiamDinhSearchRepository extends ElasticsearchRepository<HoSoGiamDinh, Long> {
}
