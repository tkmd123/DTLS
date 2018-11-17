package vn.homtech.dtls.repository.search;

import vn.homtech.dtls.domain.QuanHeThanNhan;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the QuanHeThanNhan entity.
 */
public interface QuanHeThanNhanSearchRepository extends ElasticsearchRepository<QuanHeThanNhan, Long> {
}
