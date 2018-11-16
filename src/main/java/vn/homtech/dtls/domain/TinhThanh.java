package vn.homtech.dtls.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A TinhThanh.
 */
@Entity
@Table(name = "tinh_thanh")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "tinhthanh")
public class TinhThanh implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "tinhThanh")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<QuanHuyen> tinhThanhQuanHuyens = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<QuanHuyen> getTinhThanhQuanHuyens() {
        return tinhThanhQuanHuyens;
    }

    public TinhThanh tinhThanhQuanHuyens(Set<QuanHuyen> quanHuyens) {
        this.tinhThanhQuanHuyens = quanHuyens;
        return this;
    }

    public TinhThanh addTinhThanhQuanHuyen(QuanHuyen quanHuyen) {
        this.tinhThanhQuanHuyens.add(quanHuyen);
        quanHuyen.setTinhThanh(this);
        return this;
    }

    public TinhThanh removeTinhThanhQuanHuyen(QuanHuyen quanHuyen) {
        this.tinhThanhQuanHuyens.remove(quanHuyen);
        quanHuyen.setTinhThanh(null);
        return this;
    }

    public void setTinhThanhQuanHuyens(Set<QuanHuyen> quanHuyens) {
        this.tinhThanhQuanHuyens = quanHuyens;
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
        TinhThanh tinhThanh = (TinhThanh) o;
        if (tinhThanh.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tinhThanh.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TinhThanh{" +
            "id=" + getId() +
            "}";
    }
}
