package vn.homtech.dtls.repository.search;

import vn.homtech.dtls.domain.MappingDotBien;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the MappingDotBien entity.
 */
public interface MappingDotBienSearchRepository extends ElasticsearchRepository<MappingDotBien, Long> {
}
