package com.crud.crudDemo.controller;

import com.crud.crudDemo.dto.LoginRequest;
import com.crud.crudDemo.dto.LoginResponse;
import com.crud.crudDemo.entity.Utilisateur;
import com.crud.crudDemo.service.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UtilisateurService utilisateurService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            Utilisateur utilisateur = utilisateurService.login(loginRequest.getEmail(), loginRequest.getPassword());
            LoginResponse response = new LoginResponse(utilisateur);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
}