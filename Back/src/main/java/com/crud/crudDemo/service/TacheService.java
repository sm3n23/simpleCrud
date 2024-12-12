package com.crud.crudDemo.service;

import com.crud.crudDemo.dto.TacheDto;
import com.crud.crudDemo.entity.Projet;
import com.crud.crudDemo.entity.Tache;
import com.crud.crudDemo.repository.ProjetRepository;
import com.crud.crudDemo.repository.TacheRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TacheService {
    @Autowired
    private TacheRepository tacheRepository;

    @Autowired
    private ProjetRepository projetRepository;

    public List<TacheDto> getAllTaches() {
        return tacheRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public TacheDto getTacheById(Long id) {
        Tache tache = tacheRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Tache not found"));
        return convertToDto(tache);
    }

    public TacheDto createTache(TacheDto tacheDto) {
        Projet projet = projetRepository.findById(tacheDto.getProjetId())
                .orElseThrow(() -> new EntityNotFoundException("Projet not found"));

        Tache tache = new Tache();
        tache.setTitre(tacheDto.getTitre());
        tache.setDescription(tacheDto.getDescription());
        tache.setDateEcheance(tacheDto.getDateEcheance());
        tache.setStatut(tacheDto.getStatut());
        tache.setProjet(projet);

        return convertToDto(tacheRepository.save(tache));
    }

    public TacheDto updateTache(Long id, TacheDto tacheDto) {
        Tache tache = tacheRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Tache not found"));

        tache.setTitre(tacheDto.getTitre());
        tache.setDescription(tacheDto.getDescription());
        tache.setDateEcheance(tacheDto.getDateEcheance());
        tache.setStatut(tacheDto.getStatut());

        return convertToDto(tacheRepository.save(tache));
    }

    public void deleteTache(Long id) {
        tacheRepository.deleteById(id);
    }

    private TacheDto convertToDto(Tache tache) {
        TacheDto dto = new TacheDto();
        dto.setId(tache.getId());
        dto.setTitre(tache.getTitre());
        dto.setDescription(tache.getDescription());
        dto.setDateEcheance(tache.getDateEcheance());
        dto.setStatut(tache.getStatut());
        dto.setProjetId(tache.getProjet().getId());
        return dto;
    }
}