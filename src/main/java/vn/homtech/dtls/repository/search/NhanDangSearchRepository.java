package vn.homtech.dtls.repository.search;

import vn.homtech.dtls.domain.NhanDang;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the NhanDang entity.
 */
public interface NhanDangSearchRepository extends ElasticsearchRepository<NhanDang, Long> {
}
