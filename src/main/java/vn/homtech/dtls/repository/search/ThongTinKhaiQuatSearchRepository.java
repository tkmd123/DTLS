package vn.homtech.dtls.repository.search;

import vn.homtech.dtls.domain.ThongTinKhaiQuat;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ThongTinKhaiQuat entity.
 */
public interface ThongTinKhaiQuatSearchRepository extends ElasticsearchRepository<ThongTinKhaiQuat, Long> {
}
