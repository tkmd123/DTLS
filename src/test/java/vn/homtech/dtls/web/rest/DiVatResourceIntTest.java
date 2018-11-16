package vn.homtech.dtls.web.rest;

import vn.homtech.dtls.DtlsApp;

import vn.homtech.dtls.domain.DiVat;
import vn.homtech.dtls.repository.DiVatRepository;
import vn.homtech.dtls.repository.search.DiVatSearchRepository;
import vn.homtech.dtls.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;


import static vn.homtech.dtls.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the DiVatResource REST controller.
 *
 * @see DiVatResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DtlsApp.class)
public class DiVatResourceIntTest {

    private static final String DEFAULT_MO_TA = "AAAAAAAAAA";
    private static final String UPDATED_MO_TA = "BBBBBBBBBB";

    private static final Boolean DEFAULT_IS_DELETED = false;
    private static final Boolean UPDATED_IS_DELETED = true;

    @Autowired
    private DiVatRepository diVatRepository;

    /**
     * This repository is mocked in the vn.homtech.dtls.repository.search test package.
     *
     * @see vn.homtech.dtls.repository.search.DiVatSearchRepositoryMockConfiguration
     */
    @Autowired
    private DiVatSearchRepository mockDiVatSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDiVatMockMvc;

    private DiVat diVat;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DiVatResource diVatResource = new DiVatResource(diVatRepository, mockDiVatSearchRepository);
        this.restDiVatMockMvc = MockMvcBuilders.standaloneSetup(diVatResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DiVat createEntity(EntityManager em) {
        DiVat diVat = new DiVat()
            .moTa(DEFAULT_MO_TA)
            .isDeleted(DEFAULT_IS_DELETED);
        return diVat;
    }

    @Before
    public void initTest() {
        diVat = createEntity(em);
    }

    @Test
    @Transactional
    public void createDiVat() throws Exception {
        int databaseSizeBeforeCreate = diVatRepository.findAll().size();

        // Create the DiVat
        restDiVatMockMvc.perform(post("/api/di-vats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(diVat)))
            .andExpect(status().isCreated());

        // Validate the DiVat in the database
        List<DiVat> diVatList = diVatRepository.findAll();
        assertThat(diVatList).hasSize(databaseSizeBeforeCreate + 1);
        DiVat testDiVat = diVatList.get(diVatList.size() - 1);
        assertThat(testDiVat.getMoTa()).isEqualTo(DEFAULT_MO_TA);
        assertThat(testDiVat.isIsDeleted()).isEqualTo(DEFAULT_IS_DELETED);

        // Validate the DiVat in Elasticsearch
        verify(mockDiVatSearchRepository, times(1)).save(testDiVat);
    }

    @Test
    @Transactional
    public void createDiVatWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = diVatRepository.findAll().size();

        // Create the DiVat with an existing ID
        diVat.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDiVatMockMvc.perform(post("/api/di-vats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(diVat)))
            .andExpect(status().isBadRequest());

        // Validate the DiVat in the database
        List<DiVat> diVatList = diVatRepository.findAll();
        assertThat(diVatList).hasSize(databaseSizeBeforeCreate);

        // Validate the DiVat in Elasticsearch
        verify(mockDiVatSearchRepository, times(0)).save(diVat);
    }

    @Test
    @Transactional
    public void getAllDiVats() throws Exception {
        // Initialize the database
        diVatRepository.saveAndFlush(diVat);

        // Get all the diVatList
        restDiVatMockMvc.perform(get("/api/di-vats?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(diVat.getId().intValue())))
            .andExpect(jsonPath("$.[*].moTa").value(hasItem(DEFAULT_MO_TA.toString())))
            .andExpect(jsonPath("$.[*].isDeleted").value(hasItem(DEFAULT_IS_DELETED.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getDiVat() throws Exception {
        // Initialize the database
        diVatRepository.saveAndFlush(diVat);

        // Get the diVat
        restDiVatMockMvc.perform(get("/api/di-vats/{id}", diVat.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(diVat.getId().intValue()))
            .andExpect(jsonPath("$.moTa").value(DEFAULT_MO_TA.toString()))
            .andExpect(jsonPath("$.isDeleted").value(DEFAULT_IS_DELETED.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingDiVat() throws Exception {
        // Get the diVat
        restDiVatMockMvc.perform(get("/api/di-vats/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDiVat() throws Exception {
        // Initialize the database
        diVatRepository.saveAndFlush(diVat);

        int databaseSizeBeforeUpdate = diVatRepository.findAll().size();

        // Update the diVat
        DiVat updatedDiVat = diVatRepository.findById(diVat.getId()).get();
        // Disconnect from session so that the updates on updatedDiVat are not directly saved in db
        em.detach(updatedDiVat);
        updatedDiVat
            .moTa(UPDATED_MO_TA)
            .isDeleted(UPDATED_IS_DELETED);

        restDiVatMockMvc.perform(put("/api/di-vats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDiVat)))
            .andExpect(status().isOk());

        // Validate the DiVat in the database
        List<DiVat> diVatList = diVatRepository.findAll();
        assertThat(diVatList).hasSize(databaseSizeBeforeUpdate);
        DiVat testDiVat = diVatList.get(diVatList.size() - 1);
        assertThat(testDiVat.getMoTa()).isEqualTo(UPDATED_MO_TA);
        assertThat(testDiVat.isIsDeleted()).isEqualTo(UPDATED_IS_DELETED);

        // Validate the DiVat in Elasticsearch
        verify(mockDiVatSearchRepository, times(1)).save(testDiVat);
    }

    @Test
    @Transactional
    public void updateNonExistingDiVat() throws Exception {
        int databaseSizeBeforeUpdate = diVatRepository.findAll().size();

        // Create the DiVat

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDiVatMockMvc.perform(put("/api/di-vats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(diVat)))
            .andExpect(status().isBadRequest());

        // Validate the DiVat in the database
        List<DiVat> diVatList = diVatRepository.findAll();
        assertThat(diVatList).hasSize(databaseSizeBeforeUpdate);

        // Validate the DiVat in Elasticsearch
        verify(mockDiVatSearchRepository, times(0)).save(diVat);
    }

    @Test
    @Transactional
    public void deleteDiVat() throws Exception {
        // Initialize the database
        diVatRepository.saveAndFlush(diVat);

        int databaseSizeBeforeDelete = diVatRepository.findAll().size();

        // Get the diVat
        restDiVatMockMvc.perform(delete("/api/di-vats/{id}", diVat.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DiVat> diVatList = diVatRepository.findAll();
        assertThat(diVatList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the DiVat in Elasticsearch
        verify(mockDiVatSearchRepository, times(1)).deleteById(diVat.getId());
    }

    @Test
    @Transactional
    public void searchDiVat() throws Exception {
        // Initialize the database
        diVatRepository.saveAndFlush(diVat);
        when(mockDiVatSearchRepository.search(queryStringQuery("id:" + diVat.getId())))
            .thenReturn(Collections.singletonList(diVat));
        // Search the diVat
        restDiVatMockMvc.perform(get("/api/_search/di-vats?query=id:" + diVat.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(diVat.getId().intValue())))
            .andExpect(jsonPath("$.[*].moTa").value(hasItem(DEFAULT_MO_TA)))
            .andExpect(jsonPath("$.[*].isDeleted").value(hasItem(DEFAULT_IS_DELETED.booleanValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DiVat.class);
        DiVat diVat1 = new DiVat();
        diVat1.setId(1L);
        DiVat diVat2 = new DiVat();
        diVat2.setId(diVat1.getId());
        assertThat(diVat1).isEqualTo(diVat2);
        diVat2.setId(2L);
        assertThat(diVat1).isNotEqualTo(diVat2);
        diVat1.setId(null);
        assertThat(diVat1).isNotEqualTo(diVat2);
    }
}
