package com.crud.crudDemo.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "taches")
@Getter
@Setter
public class Tache {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titre;

    private String description;

    private LocalDateTime dateCreation = LocalDateTime.now();

    private LocalDateTime dateEcheance;

    @Enumerated(EnumType.STRING)
    private StatutTache statut = StatutTache.A_FAIRE;

    @ManyToOne
    @JoinColumn(name = "projet_id")
    private Projet projet;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(LocalDateTime dateCreation) {
        this.dateCreation = dateCreation;
    }

    public LocalDateTime getDateEcheance() {
        return dateEcheance;
    }

    public void setDateEcheance(LocalDateTime dateEcheance) {
        this.dateEcheance = dateEcheance;
    }

    public StatutTache getStatut() {
        return statut;
    }

    public void setStatut(StatutTache statut) {
        this.statut = statut;
    }

    public Projet getProjet() {
        return projet;
    }

    public void setProjet(Projet projet) {
        this.projet = projet;
    }
}