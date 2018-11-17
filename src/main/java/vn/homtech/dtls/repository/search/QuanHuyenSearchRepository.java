package vn.homtech.dtls.repository.search;

import vn.homtech.dtls.domain.QuanHuyen;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the QuanHuyen entity.
 */
public interface QuanHuyenSearchRepository extends ElasticsearchRepository<QuanHuyen, Long> {
}
