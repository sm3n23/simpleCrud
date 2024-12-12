package com.crud.crudDemo.controller;

import com.crud.crudDemo.dto.TacheDto;
import com.crud.crudDemo.service.TacheService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/taches")
@CrossOrigin(origins = "*")
public class TacheController {
    @Autowired
    private TacheService tacheService;

    @GetMapping
    public ResponseEntity<List<TacheDto>> getAllTaches() {
        return ResponseEntity.ok(tacheService.getAllTaches());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TacheDto> getTacheById(@PathVariable Long id) {
        return ResponseEntity.ok(tacheService.getTacheById(id));
    }

    @PostMapping
    public ResponseEntity<TacheDto> createTache(@RequestBody TacheDto tacheDto) {
        return ResponseEntity.ok(tacheService.createTache(tacheDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TacheDto> updateTache(@PathVariable Long id, @RequestBody TacheDto tacheDto) {
        return ResponseEntity.ok(tacheService.updateTache(id, tacheDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTache(@PathVariable Long id) {
        tacheService.deleteTache(id);
        return ResponseEntity.ok().build();
    }
}