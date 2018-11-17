package vn.homtech.dtls.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of CapBacSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class CapBacSearchRepositoryMockConfiguration {

    @MockBean
    private CapBacSearchRepository mockCapBacSearchRepository;

}
