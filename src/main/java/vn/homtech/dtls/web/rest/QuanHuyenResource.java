package vn.homtech.dtls.web.rest;

import com.codahale.metrics.annotation.Timed;
import vn.homtech.dtls.domain.QuanHuyen;
import vn.homtech.dtls.repository.QuanHuyenRepository;
import vn.homtech.dtls.repository.search.QuanHuyenSearchRepository;
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
 * REST controller for managing QuanHuyen.
 */
@RestController
@RequestMapping("/api")
public class QuanHuyenResource {

    private final Logger log = LoggerFactory.getLogger(QuanHuyenResource.class);

    private static final String ENTITY_NAME = "quanHuyen";

    private final QuanHuyenRepository quanHuyenRepository;

    private final QuanHuyenSearchRepository quanHuyenSearchRepository;

    public QuanHuyenResource(QuanHuyenRepository quanHuyenRepository, QuanHuyenSearchRepository quanHuyenSearchRepository) {
        this.quanHuyenRepository = quanHuyenRepository;
        this.quanHuyenSearchRepository = quanHuyenSearchRepository;
    }

    /**
     * POST  /quan-huyens : Create a new quanHuyen.
     *
     * @param quanHuyen the quanHuyen to create
     * @return the ResponseEntity with status 201 (Created) and with body the new quanHuyen, or with status 400 (Bad Request) if the quanHuyen has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/quan-huyens")
    @Timed
    public ResponseEntity<QuanHuyen> createQuanHuyen(@RequestBody QuanHuyen quanHuyen) throws URISyntaxException {
        log.debug("REST request to save QuanHuyen : {}", quanHuyen);
        if (quanHuyen.getId() != null) {
            throw new BadRequestAlertException("A new quanHuyen cannot already have an ID", ENTITY_NAME, "idexists");
        }
        QuanHuyen result = quanHuyenRepository.save(quanHuyen);
        quanHuyenSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/quan-huyens/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /quan-huyens : Updates an existing quanHuyen.
     *
     * @param quanHuyen the quanHuyen to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated quanHuyen,
     * or with status 400 (Bad Request) if the quanHuyen is not valid,
     * or with status 500 (Internal Server Error) if the quanHuyen couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/quan-huyens")
    @Timed
    public ResponseEntity<QuanHuyen> updateQuanHuyen(@RequestBody QuanHuyen quanHuyen) throws URISyntaxException {
        log.debug("REST request to update QuanHuyen : {}", quanHuyen);
        if (quanHuyen.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        QuanHuyen result = quanHuyenRepository.save(quanHuyen);
        quanHuyenSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, quanHuyen.getId().toString()))
            .body(result);
    }

    /**
     * GET  /quan-huyens : get all the quanHuyens.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of quanHuyens in body
     */
    @GetMapping("/quan-huyens")
    @Timed
    public List<QuanHuyen> getAllQuanHuyens() {
        log.debug("REST request to get all QuanHuyens");
        return quanHuyenRepository.findAll();
    }

    /**
     * GET  /quan-huyens/:id : get the "id" quanHuyen.
     *
     * @param id the id of the quanHuyen to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the quanHuyen, or with status 404 (Not Found)
     */
    @GetMapping("/quan-huyens/{id}")
    @Timed
    public ResponseEntity<QuanHuyen> getQuanHuyen(@PathVariable Long id) {
        log.debug("REST request to get QuanHuyen : {}", id);
        Optional<QuanHuyen> quanHuyen = quanHuyenRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(quanHuyen);
    }

    /**
     * DELETE  /quan-huyens/:id : delete the "id" quanHuyen.
     *
     * @param id the id of the quanHuyen to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/quan-huyens/{id}")
    @Timed
    public ResponseEntity<Void> deleteQuanHuyen(@PathVariable Long id) {
        log.debug("REST request to delete QuanHuyen : {}", id);

        quanHuyenRepository.deleteById(id);
        quanHuyenSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/quan-huyens?query=:query : search for the quanHuyen corresponding
     * to the query.
     *
     * @param query the query of the quanHuyen search
     * @return the result of the search
     */
    @GetMapping("/_search/quan-huyens")
    @Timed
    public List<QuanHuyen> searchQuanHuyens(@RequestParam String query) {
        log.debug("REST request to search QuanHuyens for query {}", query);
        return StreamSupport
            .stream(quanHuyenSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
