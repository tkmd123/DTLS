package vn.homtech.dtls.repository.search;

import vn.homtech.dtls.domain.LoaiMauXetNghiem;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the LoaiMauXetNghiem entity.
 */
public interface LoaiMauXetNghiemSearchRepository extends ElasticsearchRepository<LoaiMauXetNghiem, Long> {
}
