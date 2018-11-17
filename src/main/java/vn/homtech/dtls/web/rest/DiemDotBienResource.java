package vn.homtech.dtls.web.rest;

import com.codahale.metrics.annotation.Timed;
import vn.homtech.dtls.domain.DiemDotBien;
import vn.homtech.dtls.repository.DiemDotBienRepository;
import vn.homtech.dtls.repository.search.DiemDotBienSearchRepository;
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
 * REST controller for managing DiemDotBien.
 */
@RestController
@RequestMapping("/api")
public class DiemDotBienResource {

    private final Logger log = LoggerFactory.getLogger(DiemDotBienResource.class);

    private static final String ENTITY_NAME = "diemDotBien";

    private final DiemDotBienRepository diemDotBienRepository;

    private final DiemDotBienSearchRepository diemDotBienSearchRepository;

    public DiemDotBienResource(DiemDotBienRepository diemDotBienRepository, DiemDotBienSearchRepository diemDotBienSearchRepository) {
        this.diemDotBienRepository = diemDotBienRepository;
        this.diemDotBienSearchRepository = diemDotBienSearchRepository;
    }

    /**
     * POST  /diem-dot-biens : Create a new diemDotBien.
     *
     * @param diemDotBien the diemDotBien to create
     * @return the ResponseEntity with status 201 (Created) and with body the new diemDotBien, or with status 400 (Bad Request) if the diemDotBien has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/diem-dot-biens")
    @Timed
    public ResponseEntity<DiemDotBien> createDiemDotBien(@RequestBody DiemDotBien diemDotBien) throws URISyntaxException {
        log.debug("REST request to save DiemDotBien : {}", diemDotBien);
        if (diemDotBien.getId() != null) {
            throw new BadRequestAlertException("A new diemDotBien cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DiemDotBien result = diemDotBienRepository.save(diemDotBien);
        diemDotBienSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/diem-dot-biens/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /diem-dot-biens : Updates an existing diemDotBien.
     *
     * @param diemDotBien the diemDotBien to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated diemDotBien,
     * or with status 400 (Bad Request) if the diemDotBien is not valid,
     * or with status 500 (Internal Server Error) if the diemDotBien couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/diem-dot-biens")
    @Timed
    public ResponseEntity<DiemDotBien> updateDiemDotBien(@RequestBody DiemDotBien diemDotBien) throws URISyntaxException {
        log.debug("REST request to update DiemDotBien : {}", diemDotBien);
        if (diemDotBien.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DiemDotBien result = diemDotBienRepository.save(diemDotBien);
        diemDotBienSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, diemDotBien.getId().toString()))
            .body(result);
    }

    /**
     * GET  /diem-dot-biens : get all the diemDotBiens.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of diemDotBiens in body
     */
    @GetMapping("/diem-dot-biens")
    @Timed
    public List<DiemDotBien> getAllDiemDotBiens() {
        log.debug("REST request to get all DiemDotBiens");
        return diemDotBienRepository.findAll();
    }

    /**
     * GET  /diem-dot-biens/:id : get the "id" diemDotBien.
     *
     * @param id the id of the diemDotBien to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the diemDotBien, or with status 404 (Not Found)
     */
    @GetMapping("/diem-dot-biens/{id}")
    @Timed
    public ResponseEntity<DiemDotBien> getDiemDotBien(@PathVariable Long id) {
        log.debug("REST request to get DiemDotBien : {}", id);
        Optional<DiemDotBien> diemDotBien = diemDotBienRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(diemDotBien);
    }

    /**
     * DELETE  /diem-dot-biens/:id : delete the "id" diemDotBien.
     *
     * @param id the id of the diemDotBien to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/diem-dot-biens/{id}")
    @Timed
    public ResponseEntity<Void> deleteDiemDotBien(@PathVariable Long id) {
        log.debug("REST request to delete DiemDotBien : {}", id);

        diemDotBienRepository.deleteById(id);
        diemDotBienSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/diem-dot-biens?query=:query : search for the diemDotBien corresponding
     * to the query.
     *
     * @param query the query of the diemDotBien search
     * @return the result of the search
     */
    @GetMapping("/_search/diem-dot-biens")
    @Timed
    public List<DiemDotBien> searchDiemDotBiens(@RequestParam String query) {
        log.debug("REST request to search DiemDotBiens for query {}", query);
        return StreamSupport
            .stream(diemDotBienSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
