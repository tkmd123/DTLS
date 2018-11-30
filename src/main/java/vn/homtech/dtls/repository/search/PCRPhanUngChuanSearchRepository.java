package vn.homtech.dtls.repository.search;

import vn.homtech.dtls.domain.PCRPhanUngChuan;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the PCRPhanUngChuan entity.
 */
public interface PCRPhanUngChuanSearchRepository extends ElasticsearchRepository<PCRPhanUngChuan, Long> {
}
