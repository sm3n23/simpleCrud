package com.crud.crudDemo.controller;
import com.crud.crudDemo.dto.UtilisateurDto;
import com.crud.crudDemo.service.UtilisateurService;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/utilisateurs")
@CrossOrigin(origins = "*")
public class UtilisateurController {

    @Autowired
    private UtilisateurService utilisateurService;

    @GetMapping
    public ResponseEntity<List<UtilisateurDto>> getAllUtilisateurs() {
        return ResponseEntity.ok(utilisateurService.getAllUtilisateurs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UtilisateurDto> getUtilisateurById(@PathVariable Long id) {
        return ResponseEntity.ok(utilisateurService.getUtilisateurById(id));
    }

    @PostMapping
    public ResponseEntity<UtilisateurDto> createUtilisateur(@RequestBody UtilisateurDto utilisateurDto) {
        return new ResponseEntity<>(utilisateurService.createUtilisateur(utilisateurDto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UtilisateurDto> updateUtilisateur(
            @PathVariable Long id,
            @RequestBody UtilisateurDto utilisateurDto) {
        return ResponseEntity.ok(utilisateurService.updateUtilisateur(id, utilisateurDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUtilisateur(@PathVariable Long id) {
        utilisateurService.deleteUtilisateur(id);
        return ResponseEntity.ok("user deleted");
    }
}
