package com.crud.crudDemo.service;

import com.crud.crudDemo.dto.ProjetDto;
import com.crud.crudDemo.entity.Projet;
import com.crud.crudDemo.entity.Utilisateur;
import com.crud.crudDemo.repository.ProjetRepository;
import com.crud.crudDemo.repository.UtilisateurRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjetService {
    @Autowired
    private ProjetRepository projetRepository;

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    public List<ProjetDto> getAllProjets() {
        return projetRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public ProjetDto getProjetById(Long id) {
        Projet projet = projetRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Projet not found"));
        return convertToDto(projet);
    }

    public ProjetDto createProjet(ProjetDto projetDto) {
        Utilisateur utilisateur = utilisateurRepository.findById(projetDto.getUtilisateurId())
                .orElseThrow(() -> new EntityNotFoundException("Utilisateur not found"));

        Projet projet = new Projet();
        projet.setNom(projetDto.getNom());
        projet.setDescription(projetDto.getDescription());
        projet.setUtilisateur(utilisateur);

        return convertToDto(projetRepository.save(projet));
    }

    public ProjetDto updateProjet(Long id, ProjetDto projetDto) {
        Projet projet = projetRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Projet not found"));

        Utilisateur utilisateur = utilisateurRepository.findById(projetDto.getUtilisateurId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        projet.setNom(projetDto.getNom());
        projet.setDescription(projetDto.getDescription());
        projet.setUtilisateur(utilisateur);

        return convertToDto(projetRepository.save(projet));
    }

    public void deleteProjet(Long id) {
        projetRepository.deleteById(id);
    }

    private ProjetDto convertToDto(Projet projet) {
        ProjetDto dto = new ProjetDto();
        dto.setId(projet.getId());
        dto.setNom(projet.getNom());
        dto.setDescription(projet.getDescription());
        dto.setUtilisateurId(projet.getUtilisateur().getId());
        return dto;
    }
}
