package vn.homtech.dtls.repository.search;

import vn.homtech.dtls.domain.MauTachChiet;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the MauTachChiet entity.
 */
public interface MauTachChietSearchRepository extends ElasticsearchRepository<MauTachChiet, Long> {
}
