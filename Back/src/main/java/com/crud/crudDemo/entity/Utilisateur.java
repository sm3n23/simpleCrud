package com.crud.crudDemo.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "utilisateurs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Utilisateur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String email;

    private String password;

    private String nom;

    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy = "utilisateur", cascade = CascadeType.ALL)
    private List<Projet> projets = new ArrayList<>();
}

