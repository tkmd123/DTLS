package vn.homtech.dtls.repository.search;

import vn.homtech.dtls.domain.MauXetNghiem;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the MauXetNghiem entity.
 */
public interface MauXetNghiemSearchRepository extends ElasticsearchRepository<MauXetNghiem, Long> {
}
