package io.jwamser.TrelloBoardSample.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jdk.nashorn.internal.ir.annotations.Ignore;

import javax.persistence.*;

@Entity
public class Card {

    @Id
    private String cid;
    private String summary;

    private String status = "TODO";

    public String getCid() {
        return cid;
    }

    public void setCid(String cid) {
        this.cid = cid;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Card{" +
                "cid=" + cid +
                ", summary='" + summary + '\'' +
                '}';
    }
}
