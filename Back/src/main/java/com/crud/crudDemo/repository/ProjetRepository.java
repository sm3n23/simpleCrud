package com.crud.crudDemo.repository;

import com.crud.crudDemo.entity.Projet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjetRepository extends JpaRepository<Projet, Long> {
    List<Projet> findByUtilisateurId(Long utilisateurId);
}