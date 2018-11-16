package vn.homtech.dtls.web.rest;

import com.codahale.metrics.annotation.Timed;
import vn.homtech.dtls.domain.ThongTinMo;
import vn.homtech.dtls.repository.ThongTinMoRepository;
import vn.homtech.dtls.repository.search.ThongTinMoSearchRepository;
import vn.homtech.dtls.web.rest.errors.BadRequestAlertException;
import vn.homtech.dtls.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing ThongTinMo.
 */
@RestController
@RequestMapping("/api")
public class ThongTinMoResource {

    private final Logger log = LoggerFactory.getLogger(ThongTinMoResource.class);

    private static final String ENTITY_NAME = "thongTinMo";

    private final ThongTinMoRepository thongTinMoRepository;

    private final ThongTinMoSearchRepository thongTinMoSearchRepository;

    public ThongTinMoResource(ThongTinMoRepository thongTinMoRepository, ThongTinMoSearchRepository thongTinMoSearchRepository) {
        this.thongTinMoRepository = thongTinMoRepository;
        this.thongTinMoSearchRepository = thongTinMoSearchRepository;
    }

    /**
     * POST  /thong-tin-mos : Create a new thongTinMo.
     *
     * @param thongTinMo the thongTinMo to create
     * @return the ResponseEntity with status 201 (Created) and with body the new thongTinMo, or with status 400 (Bad Request) if the thongTinMo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/thong-tin-mos")
    @Timed
    public ResponseEntity<ThongTinMo> createThongTinMo(@RequestBody ThongTinMo thongTinMo) throws URISyntaxException {
        log.debug("REST request to save ThongTinMo : {}", thongTinMo);
        if (thongTinMo.getId() != null) {
            throw new BadRequestAlertException("A new thongTinMo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ThongTinMo result = thongTinMoRepository.save(thongTinMo);
        thongTinMoSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/thong-tin-mos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /thong-tin-mos : Updates an existing thongTinMo.
     *
     * @param thongTinMo the thongTinMo to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated thongTinMo,
     * or with status 400 (Bad Request) if the thongTinMo is not valid,
     * or with status 500 (Internal Server Error) if the thongTinMo couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/thong-tin-mos")
    @Timed
    public ResponseEntity<ThongTinMo> updateThongTinMo(@RequestBody ThongTinMo thongTinMo) throws URISyntaxException {
        log.debug("REST request to update ThongTinMo : {}", thongTinMo);
        if (thongTinMo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ThongTinMo result = thongTinMoRepository.save(thongTinMo);
        thongTinMoSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, thongTinMo.getId().toString()))
            .body(result);
    }

    /**
     * GET  /thong-tin-mos : get all the thongTinMos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of thongTinMos in body
     */
    @GetMapping("/thong-tin-mos")
    @Timed
    public List<ThongTinMo> getAllThongTinMos() {
        log.debug("REST request to get all ThongTinMos");
        return thongTinMoRepository.findAll();
    }

    /**
     * GET  /thong-tin-mos/:id : get the "id" thongTinMo.
     *
     * @param id the id of the thongTinMo to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the thongTinMo, or with status 404 (Not Found)
     */
    @GetMapping("/thong-tin-mos/{id}")
    @Timed
    public ResponseEntity<ThongTinMo> getThongTinMo(@PathVariable Long id) {
        log.debug("REST request to get ThongTinMo : {}", id);
        Optional<ThongTinMo> thongTinMo = thongTinMoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(thongTinMo);
    }

    /**
     * DELETE  /thong-tin-mos/:id : delete the "id" thongTinMo.
     *
     * @param id the id of the thongTinMo to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/thong-tin-mos/{id}")
    @Timed
    public ResponseEntity<Void> deleteThongTinMo(@PathVariable Long id) {
        log.debug("REST request to delete ThongTinMo : {}", id);

        thongTinMoRepository.deleteById(id);
        thongTinMoSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/thong-tin-mos?query=:query : search for the thongTinMo corresponding
     * to the query.
     *
     * @param query the query of the thongTinMo search
     * @return the result of the search
     */
    @GetMapping("/_search/thong-tin-mos")
    @Timed
    public List<ThongTinMo> searchThongTinMos(@RequestParam String query) {
        log.debug("REST request to search ThongTinMos for query {}", query);
        return StreamSupport
            .stream(thongTinMoSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
