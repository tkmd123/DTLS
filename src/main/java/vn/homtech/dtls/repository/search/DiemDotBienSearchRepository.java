package vn.homtech.dtls.repository.search;

import vn.homtech.dtls.domain.DiemDotBien;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the DiemDotBien entity.
 */
public interface DiemDotBienSearchRepository extends ElasticsearchRepository<DiemDotBien, Long> {
}
