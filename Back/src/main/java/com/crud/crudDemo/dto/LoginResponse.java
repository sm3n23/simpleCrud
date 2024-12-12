package com.crud.crudDemo.dto;

import com.crud.crudDemo.entity.Utilisateur;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class LoginResponse {
    private Long id;
    private String email;
    private String nom;
    private String role;

    public LoginResponse(Utilisateur utilisateur) {
        this.id = utilisateur.getId();
        this.email = utilisateur.getEmail();
        this.nom = utilisateur.getNom();
        this.role = utilisateur.getRole().toString();
    }
}
