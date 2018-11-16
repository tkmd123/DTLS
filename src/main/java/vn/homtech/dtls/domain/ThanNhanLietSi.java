package vn.homtech.dtls.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A ThanNhanLietSi.
 */
@Entity
@Table(name = "than_nhan_liet_si")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "thannhanlietsi")
public class ThanNhanLietSi implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "mo_ta")
    private String moTa;

    @Column(name = "is_deleted")
    private Boolean isDeleted;

    @ManyToOne
    @JsonIgnoreProperties("lietSis")
    private HoSoLietSi hoSoLietSi;

    @ManyToOne
    @JsonIgnoreProperties("quanHeThanNhans")
    private QuanHeThanNhan quanHeThanNhan;

    @ManyToOne
    @JsonIgnoreProperties("thanNhans")
    private HoSoThanNhan hoSoThanNhan;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMoTa() {
        return moTa;
    }

    public ThanNhanLietSi moTa(String moTa) {
        this.moTa = moTa;
        return this;
    }

    public void setMoTa(String moTa) {
        this.moTa = moTa;
    }

    public Boolean isIsDeleted() {
        return isDeleted;
    }

    public ThanNhanLietSi isDeleted(Boolean isDeleted) {
        this.isDeleted = isDeleted;
        return this;
    }

    public void setIsDeleted(Boolean isDeleted) {
        this.isDeleted = isDeleted;
    }

    public HoSoLietSi getHoSoLietSi() {
        return hoSoLietSi;
    }

    public ThanNhanLietSi hoSoLietSi(HoSoLietSi hoSoLietSi) {
        this.hoSoLietSi = hoSoLietSi;
        return this;
    }

    public void setHoSoLietSi(HoSoLietSi hoSoLietSi) {
        this.hoSoLietSi = hoSoLietSi;
    }

    public QuanHeThanNhan getQuanHeThanNhan() {
        return quanHeThanNhan;
    }

    public ThanNhanLietSi quanHeThanNhan(QuanHeThanNhan quanHeThanNhan) {
        this.quanHeThanNhan = quanHeThanNhan;
        return this;
    }

    public void setQuanHeThanNhan(QuanHeThanNhan quanHeThanNhan) {
        this.quanHeThanNhan = quanHeThanNhan;
    }

    public HoSoThanNhan getHoSoThanNhan() {
        return hoSoThanNhan;
    }

    public ThanNhanLietSi hoSoThanNhan(HoSoThanNhan hoSoThanNhan) {
        this.hoSoThanNhan = hoSoThanNhan;
        return this;
    }

    public void setHoSoThanNhan(HoSoThanNhan hoSoThanNhan) {
        this.hoSoThanNhan = hoSoThanNhan;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ThanNhanLietSi thanNhanLietSi = (ThanNhanLietSi) o;
        if (thanNhanLietSi.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), thanNhanLietSi.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ThanNhanLietSi{" +
            "id=" + getId() +
            ", moTa='" + getMoTa() + "'" +
            ", isDeleted='" + isIsDeleted() + "'" +
            "}";
    }
}
