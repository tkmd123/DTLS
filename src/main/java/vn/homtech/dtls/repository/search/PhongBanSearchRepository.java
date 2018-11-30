package vn.homtech.dtls.repository.search;

import vn.homtech.dtls.domain.PhongBan;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the PhongBan entity.
 */
public interface PhongBanSearchRepository extends ElasticsearchRepository<PhongBan, Long> {
}
