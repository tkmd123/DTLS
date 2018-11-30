package vn.homtech.dtls.repository.search;

import vn.homtech.dtls.domain.TinhSachPhanUng;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the TinhSachPhanUng entity.
 */
public interface TinhSachPhanUngSearchRepository extends ElasticsearchRepository<TinhSachPhanUng, Long> {
}
