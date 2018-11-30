package vn.homtech.dtls.repository.search;

import vn.homtech.dtls.domain.NghiaTrang;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the NghiaTrang entity.
 */
public interface NghiaTrangSearchRepository extends ElasticsearchRepository<NghiaTrang, Long> {
}
