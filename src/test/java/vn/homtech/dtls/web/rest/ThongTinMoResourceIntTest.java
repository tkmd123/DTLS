package vn.homtech.dtls.web.rest;

import vn.homtech.dtls.DtlsApp;

import vn.homtech.dtls.domain.ThongTinMo;
import vn.homtech.dtls.repository.ThongTinMoRepository;
import vn.homtech.dtls.repository.search.ThongTinMoSearchRepository;
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
 * Test class for the ThongTinMoResource REST controller.
 *
 * @see ThongTinMoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DtlsApp.class)
public class ThongTinMoResourceIntTest {

    private static final String DEFAULT_KHU_MO = "AAAAAAAAAA";
    private static final String UPDATED_KHU_MO = "BBBBBBBBBB";

    private static final String DEFAULT_LO_MO = "AAAAAAAAAA";
    private static final String UPDATED_LO_MO = "BBBBBBBBBB";

    private static final Integer DEFAULT_HANG_MO = 1;
    private static final Integer UPDATED_HANG_MO = 2;

    private static final Integer DEFAULT_SO_MO = 1;
    private static final Integer UPDATED_SO_MO = 2;

    private static final String DEFAULT_MO_TA = "AAAAAAAAAA";
    private static final String UPDATED_MO_TA = "BBBBBBBBBB";

    private static final Boolean DEFAULT_IS_DELETED = false;
    private static final Boolean UPDATED_IS_DELETED = true;

    @Autowired
    private ThongTinMoRepository thongTinMoRepository;

    /**
     * This repository is mocked in the vn.homtech.dtls.repository.search test package.
     *
     * @see vn.homtech.dtls.repository.search.ThongTinMoSearchRepositoryMockConfiguration
     */
    @Autowired
    private ThongTinMoSearchRepository mockThongTinMoSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restThongTinMoMockMvc;

    private ThongTinMo thongTinMo;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ThongTinMoResource thongTinMoResource = new ThongTinMoResource(thongTinMoRepository, mockThongTinMoSearchRepository);
        this.restThongTinMoMockMvc = MockMvcBuilders.standaloneSetup(thongTinMoResource)
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
    public static ThongTinMo createEntity(EntityManager em) {
        ThongTinMo thongTinMo = new ThongTinMo()
            .khuMo(DEFAULT_KHU_MO)
            .loMo(DEFAULT_LO_MO)
            .hangMo(DEFAULT_HANG_MO)
            .soMo(DEFAULT_SO_MO)
            .moTa(DEFAULT_MO_TA)
            .isDeleted(DEFAULT_IS_DELETED);
        return thongTinMo;
    }

    @Before
    public void initTest() {
        thongTinMo = createEntity(em);
    }

    @Test
    @Transactional
    public void createThongTinMo() throws Exception {
        int databaseSizeBeforeCreate = thongTinMoRepository.findAll().size();

        // Create the ThongTinMo
        restThongTinMoMockMvc.perform(post("/api/thong-tin-mos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(thongTinMo)))
            .andExpect(status().isCreated());

        // Validate the ThongTinMo in the database
        List<ThongTinMo> thongTinMoList = thongTinMoRepository.findAll();
        assertThat(thongTinMoList).hasSize(databaseSizeBeforeCreate + 1);
        ThongTinMo testThongTinMo = thongTinMoList.get(thongTinMoList.size() - 1);
        assertThat(testThongTinMo.getKhuMo()).isEqualTo(DEFAULT_KHU_MO);
        assertThat(testThongTinMo.getLoMo()).isEqualTo(DEFAULT_LO_MO);
        assertThat(testThongTinMo.getHangMo()).isEqualTo(DEFAULT_HANG_MO);
        assertThat(testThongTinMo.getSoMo()).isEqualTo(DEFAULT_SO_MO);
        assertThat(testThongTinMo.getMoTa()).isEqualTo(DEFAULT_MO_TA);
        assertThat(testThongTinMo.isIsDeleted()).isEqualTo(DEFAULT_IS_DELETED);

        // Validate the ThongTinMo in Elasticsearch
        verify(mockThongTinMoSearchRepository, times(1)).save(testThongTinMo);
    }

    @Test
    @Transactional
    public void createThongTinMoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = thongTinMoRepository.findAll().size();

        // Create the ThongTinMo with an existing ID
        thongTinMo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restThongTinMoMockMvc.perform(post("/api/thong-tin-mos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(thongTinMo)))
            .andExpect(status().isBadRequest());

        // Validate the ThongTinMo in the database
        List<ThongTinMo> thongTinMoList = thongTinMoRepository.findAll();
        assertThat(thongTinMoList).hasSize(databaseSizeBeforeCreate);

        // Validate the ThongTinMo in Elasticsearch
        verify(mockThongTinMoSearchRepository, times(0)).save(thongTinMo);
    }

    @Test
    @Transactional
    public void getAllThongTinMos() throws Exception {
        // Initialize the database
        thongTinMoRepository.saveAndFlush(thongTinMo);

        // Get all the thongTinMoList
        restThongTinMoMockMvc.perform(get("/api/thong-tin-mos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(thongTinMo.getId().intValue())))
            .andExpect(jsonPath("$.[*].khuMo").value(hasItem(DEFAULT_KHU_MO.toString())))
            .andExpect(jsonPath("$.[*].loMo").value(hasItem(DEFAULT_LO_MO.toString())))
            .andExpect(jsonPath("$.[*].hangMo").value(hasItem(DEFAULT_HANG_MO)))
            .andExpect(jsonPath("$.[*].soMo").value(hasItem(DEFAULT_SO_MO)))
            .andExpect(jsonPath("$.[*].moTa").value(hasItem(DEFAULT_MO_TA.toString())))
            .andExpect(jsonPath("$.[*].isDeleted").value(hasItem(DEFAULT_IS_DELETED.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getThongTinMo() throws Exception {
        // Initialize the database
        thongTinMoRepository.saveAndFlush(thongTinMo);

        // Get the thongTinMo
        restThongTinMoMockMvc.perform(get("/api/thong-tin-mos/{id}", thongTinMo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(thongTinMo.getId().intValue()))
            .andExpect(jsonPath("$.khuMo").value(DEFAULT_KHU_MO.toString()))
            .andExpect(jsonPath("$.loMo").value(DEFAULT_LO_MO.toString()))
            .andExpect(jsonPath("$.hangMo").value(DEFAULT_HANG_MO))
            .andExpect(jsonPath("$.soMo").value(DEFAULT_SO_MO))
            .andExpect(jsonPath("$.moTa").value(DEFAULT_MO_TA.toString()))
            .andExpect(jsonPath("$.isDeleted").value(DEFAULT_IS_DELETED.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingThongTinMo() throws Exception {
        // Get the thongTinMo
        restThongTinMoMockMvc.perform(get("/api/thong-tin-mos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateThongTinMo() throws Exception {
        // Initialize the database
        thongTinMoRepository.saveAndFlush(thongTinMo);

        int databaseSizeBeforeUpdate = thongTinMoRepository.findAll().size();

        // Update the thongTinMo
        ThongTinMo updatedThongTinMo = thongTinMoRepository.findById(thongTinMo.getId()).get();
        // Disconnect from session so that the updates on updatedThongTinMo are not directly saved in db
        em.detach(updatedThongTinMo);
        updatedThongTinMo
            .khuMo(UPDATED_KHU_MO)
            .loMo(UPDATED_LO_MO)
            .hangMo(UPDATED_HANG_MO)
            .soMo(UPDATED_SO_MO)
            .moTa(UPDATED_MO_TA)
            .isDeleted(UPDATED_IS_DELETED);

        restThongTinMoMockMvc.perform(put("/api/thong-tin-mos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedThongTinMo)))
            .andExpect(status().isOk());

        // Validate the ThongTinMo in the database
        List<ThongTinMo> thongTinMoList = thongTinMoRepository.findAll();
        assertThat(thongTinMoList).hasSize(databaseSizeBeforeUpdate);
        ThongTinMo testThongTinMo = thongTinMoList.get(thongTinMoList.size() - 1);
        assertThat(testThongTinMo.getKhuMo()).isEqualTo(UPDATED_KHU_MO);
        assertThat(testThongTinMo.getLoMo()).isEqualTo(UPDATED_LO_MO);
        assertThat(testThongTinMo.getHangMo()).isEqualTo(UPDATED_HANG_MO);
        assertThat(testThongTinMo.getSoMo()).isEqualTo(UPDATED_SO_MO);
        assertThat(testThongTinMo.getMoTa()).isEqualTo(UPDATED_MO_TA);
        assertThat(testThongTinMo.isIsDeleted()).isEqualTo(UPDATED_IS_DELETED);

        // Validate the ThongTinMo in Elasticsearch
        verify(mockThongTinMoSearchRepository, times(1)).save(testThongTinMo);
    }

    @Test
    @Transactional
    public void updateNonExistingThongTinMo() throws Exception {
        int databaseSizeBeforeUpdate = thongTinMoRepository.findAll().size();

        // Create the ThongTinMo

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restThongTinMoMockMvc.perform(put("/api/thong-tin-mos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(thongTinMo)))
            .andExpect(status().isBadRequest());

        // Validate the ThongTinMo in the database
        List<ThongTinMo> thongTinMoList = thongTinMoRepository.findAll();
        assertThat(thongTinMoList).hasSize(databaseSizeBeforeUpdate);

        // Validate the ThongTinMo in Elasticsearch
        verify(mockThongTinMoSearchRepository, times(0)).save(thongTinMo);
    }

    @Test
    @Transactional
    public void deleteThongTinMo() throws Exception {
        // Initialize the database
        thongTinMoRepository.saveAndFlush(thongTinMo);

        int databaseSizeBeforeDelete = thongTinMoRepository.findAll().size();

        // Get the thongTinMo
        restThongTinMoMockMvc.perform(delete("/api/thong-tin-mos/{id}", thongTinMo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ThongTinMo> thongTinMoList = thongTinMoRepository.findAll();
        assertThat(thongTinMoList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the ThongTinMo in Elasticsearch
        verify(mockThongTinMoSearchRepository, times(1)).deleteById(thongTinMo.getId());
    }

    @Test
    @Transactional
    public void searchThongTinMo() throws Exception {
        // Initialize the database
        thongTinMoRepository.saveAndFlush(thongTinMo);
        when(mockThongTinMoSearchRepository.search(queryStringQuery("id:" + thongTinMo.getId())))
            .thenReturn(Collections.singletonList(thongTinMo));
        // Search the thongTinMo
        restThongTinMoMockMvc.perform(get("/api/_search/thong-tin-mos?query=id:" + thongTinMo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(thongTinMo.getId().intValue())))
            .andExpect(jsonPath("$.[*].khuMo").value(hasItem(DEFAULT_KHU_MO)))
            .andExpect(jsonPath("$.[*].loMo").value(hasItem(DEFAULT_LO_MO)))
            .andExpect(jsonPath("$.[*].hangMo").value(hasItem(DEFAULT_HANG_MO)))
            .andExpect(jsonPath("$.[*].soMo").value(hasItem(DEFAULT_SO_MO)))
            .andExpect(jsonPath("$.[*].moTa").value(hasItem(DEFAULT_MO_TA)))
            .andExpect(jsonPath("$.[*].isDeleted").value(hasItem(DEFAULT_IS_DELETED.booleanValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ThongTinMo.class);
        ThongTinMo thongTinMo1 = new ThongTinMo();
        thongTinMo1.setId(1L);
        ThongTinMo thongTinMo2 = new ThongTinMo();
        thongTinMo2.setId(thongTinMo1.getId());
        assertThat(thongTinMo1).isEqualTo(thongTinMo2);
        thongTinMo2.setId(2L);
        assertThat(thongTinMo1).isNotEqualTo(thongTinMo2);
        thongTinMo1.setId(null);
        assertThat(thongTinMo1).isNotEqualTo(thongTinMo2);
    }
}
