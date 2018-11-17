package vn.homtech.dtls.repository.search;

import vn.homtech.dtls.domain.LoaiDiVat;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the LoaiDiVat entity.
 */
public interface LoaiDiVatSearchRepository extends ElasticsearchRepository<LoaiDiVat, Long> {
}
