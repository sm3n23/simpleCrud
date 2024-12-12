package com.crud.crudDemo.service;



import com.crud.crudDemo.dto.UtilisateurDto;
import com.crud.crudDemo.entity.Utilisateur;
import com.crud.crudDemo.repository.UtilisateurRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UtilisateurService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    public Utilisateur login(String email, String password) {
        return utilisateurRepository.findByEmail(email)
                .filter(user -> user.getPassword().equals(password))
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));
    }

    public List<UtilisateurDto> getAllUtilisateurs() {
        return utilisateurRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public UtilisateurDto getUtilisateurById(Long id) {
        Utilisateur utilisateur = utilisateurRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Utilisateur not found with id: " + id));
        return convertToDto(utilisateur);
    }

    public UtilisateurDto createUtilisateur(UtilisateurDto utilisateurDto) {
        if (utilisateurRepository.existsByEmail(utilisateurDto.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }

        Utilisateur utilisateur = convertToEntity(utilisateurDto);
        Utilisateur savedUtilisateur = utilisateurRepository.save(utilisateur);
        return convertToDto(savedUtilisateur);
    }

    public UtilisateurDto updateUtilisateur(Long id, UtilisateurDto utilisateurDto) {
        Utilisateur utilisateur = utilisateurRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Utilisateur not found with id: " + id));

        if (!utilisateur.getEmail().equals(utilisateurDto.getEmail()) &&
                utilisateurRepository.existsByEmail(utilisateurDto.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }

        utilisateur.setEmail(utilisateurDto.getEmail());
        utilisateur.setNom(utilisateurDto.getNom());
        utilisateur.setRole(utilisateurDto.getRole());
        utilisateur.setPassword(utilisateurDto.getPassword());

        Utilisateur updatedUtilisateur = utilisateurRepository.save(utilisateur);
        return convertToDto(updatedUtilisateur);
    }

    public String deleteUtilisateur(Long id) {
        if (!utilisateurRepository.existsById(id)) {
            throw new EntityNotFoundException("Utilisateur not found with id: " + id);
        }
        utilisateurRepository.deleteById(id);
        return "user deleted";
    }

    private UtilisateurDto convertToDto(Utilisateur utilisateur) {
        UtilisateurDto dto = new UtilisateurDto();
        dto.setId(utilisateur.getId());
        dto.setEmail(utilisateur.getEmail());
        dto.setNom(utilisateur.getNom());
        dto.setRole(utilisateur.getRole());
        dto.setPassword(utilisateur.getPassword());
        return dto;
    }

    private Utilisateur convertToEntity(UtilisateurDto dto) {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setEmail(dto.getEmail());
        utilisateur.setNom(dto.getNom());
        utilisateur.setRole(dto.getRole());
        utilisateur.setPassword(dto.getPassword());
        return utilisateur;
    }
}

