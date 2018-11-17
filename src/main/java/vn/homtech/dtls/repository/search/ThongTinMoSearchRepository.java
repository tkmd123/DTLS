package vn.homtech.dtls.repository.search;

import vn.homtech.dtls.domain.ThongTinMo;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ThongTinMo entity.
 */
public interface ThongTinMoSearchRepository extends ElasticsearchRepository<ThongTinMo, Long> {
}
