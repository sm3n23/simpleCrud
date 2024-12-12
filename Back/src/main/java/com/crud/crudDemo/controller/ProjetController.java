package com.crud.crudDemo.controller;

import com.crud.crudDemo.dto.ProjetDto;
import com.crud.crudDemo.service.ProjetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projets")
@CrossOrigin(origins = "*")
public class ProjetController {
    @Autowired
    private ProjetService projetService;

    @GetMapping
    public ResponseEntity<List<ProjetDto>> getAllProjets() {
        return ResponseEntity.ok(projetService.getAllProjets());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjetDto> getProjetById(@PathVariable Long id) {
        return ResponseEntity.ok(projetService.getProjetById(id));
    }

    @PostMapping
    public ResponseEntity<ProjetDto> createProjet(@RequestBody ProjetDto projetDto) {
        return ResponseEntity.ok(projetService.createProjet(projetDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProjetDto> updateProjet(@PathVariable Long id, @RequestBody ProjetDto projetDto) {
        return ResponseEntity.ok(projetService.updateProjet(id, projetDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProjet(@PathVariable Long id) {
        projetService.deleteProjet(id);
        return ResponseEntity.ok().build();
    }
}