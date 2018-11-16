package vn.homtech.dtls.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of ChucVuSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class ChucVuSearchRepositoryMockConfiguration {

    @MockBean
    private ChucVuSearchRepository mockChucVuSearchRepository;

}