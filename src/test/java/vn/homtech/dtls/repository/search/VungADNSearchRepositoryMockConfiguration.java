package vn.homtech.dtls.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of VungADNSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class VungADNSearchRepositoryMockConfiguration {

    @MockBean
    private VungADNSearchRepository mockVungADNSearchRepository;

}
