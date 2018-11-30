package vn.homtech.dtls.repository.search;

import vn.homtech.dtls.domain.NhanVien;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the NhanVien entity.
 */
public interface NhanVienSearchRepository extends ElasticsearchRepository<NhanVien, Long> {
}
