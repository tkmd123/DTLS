package vn.homtech.dtls.repository.search;

import vn.homtech.dtls.domain.DonViThoiKy;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the DonViThoiKy entity.
 */
public interface DonViThoiKySearchRepository extends ElasticsearchRepository<DonViThoiKy, Long> {
}
