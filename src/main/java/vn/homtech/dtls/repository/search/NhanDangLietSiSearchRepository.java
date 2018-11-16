package vn.homtech.dtls.repository.search;

import vn.homtech.dtls.domain.NhanDangLietSi;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the NhanDangLietSi entity.
 */
public interface NhanDangLietSiSearchRepository extends ElasticsearchRepository<NhanDangLietSi, Long> {
}
