package com.magcalas.pet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.View;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:5173") // Allow requests from React's development server
@Controller // This means that this class is a Controller
@RequestMapping(path="/magcalas/pets") // This means URL's start with /magcalas/pets
public class PetController {
    @Autowired
    private PetRepository petRepository;

    @Autowired
    private View error;

    @GetMapping()
    public @ResponseBody Iterable<Pet> getAllPets() {
        return petRepository.findAll(); // Return all pets
    }

    @PostMapping()
    public ResponseEntity<Pet> createPet(@RequestBody Pet pet) {
        Pet savedPet = petRepository.save(pet);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPet); // Returns the saved Pet object with 201 Created
    }

    @PostMapping("/bulk")
    public ResponseEntity<List<Pet>> createPets(@RequestBody List<Pet> pets) {
        List<Pet> savedPets = petRepository.saveAll(pets);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPets); // Returns the list of saved Pet objects with 201 Created
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePet(@PathVariable Integer id, @RequestBody Pet pet) {
        return petRepository.findById(id)
                .map(currentPet -> {
                    currentPet.setName(pet.getName());
                    currentPet.setSpecies(pet.getSpecies());
                    currentPet.setBreed(pet.getBreed());
                    currentPet.setGender(pet.getGender());
                    currentPet.setImage(pet.getImage());
                    currentPet.setDescription(pet.getDescription());
                    currentPet.setPrice(pet.getPrice());
                    Pet updatedPet = petRepository.save(currentPet);
                    return ResponseEntity.ok(updatedPet); // Return the updated Pet object
                })
                .orElseThrow(() -> new RuntimeException("No Pet found with id: " + id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePet(@PathVariable Integer id) {
        return petRepository.findById(id)
                .map(pet -> {
                    petRepository.deleteById(id);
                    return ResponseEntity.ok(java.util.Collections.singletonMap("message", "Pet with id " + id + " deleted."));
                })
                .orElse(ResponseEntity.badRequest().body(java.util.Collections.singletonMap("error", "No Pet found with id: " + id)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPet(@PathVariable Integer id) {
        return petRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.noContent().build());
    }

    @GetMapping("/search/{key}")
    public ResponseEntity<?> searchPet(@PathVariable String key) {
        List<Pet> pets = petRepository.findByNameOrSpeciesOrBreedOrGenderOrImageOrDescription(
                key, key, key, key, key, key);

        if (pets.isEmpty()) {
            return ResponseEntity.ok(java.util.Collections.singletonMap("message", "No pet found for keyword: " + key));
        }

        return ResponseEntity.ok(pets);
    }

    @GetMapping("/search/price/{price}")
    public ResponseEntity<?> getPetsByPrice(@PathVariable Double price) {
        List<Pet> pets = petRepository.findByPriceLessThanEqual(price);

        if (!pets.isEmpty()) {
            return ResponseEntity.ok(pets);
        } else {
            return ResponseEntity.ok(java.util.Collections.singletonMap("message", "No pets found for the price of: " + price));
        }
    }
}