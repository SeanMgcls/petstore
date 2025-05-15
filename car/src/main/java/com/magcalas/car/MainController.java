package com.magcalas.car;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;


@Controller // This means that this class is a Controller
@RequestMapping(path="/magcalas/cars") // This means URL's start with /demo (after Application path)
public class MainController {
    @Autowired
    private CarRepository carRepository;


    @GetMapping()
    public @ResponseBody Iterable<Car> getAllUsers() {
        // This returns a JSON or XML with the users
        return carRepository.findAll();
    }


    @PostMapping()
    public ResponseEntity<Car> createCars(@RequestBody Car car) {
        Car savedCar = carRepository.save(car);
        return ResponseEntity.ok(savedCar); // Returns 200 OK instead of 201 Created
    }



    @PutMapping("/{id}")
    public ResponseEntity updateCar(@PathVariable Integer id, @RequestBody Car car) {
        Car currentCar = carRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No Car found with id: " + id));

        currentCar.setBrand(car.getBrand());
        currentCar.setModel(car.getModel());
        currentCar.setBody(car.getBody());
        currentCar.setPrice(car.getPrice());
        currentCar = carRepository.save(currentCar);
        return ResponseEntity.ok("Car with id " + id + " updated.");
    }

    @DeleteMapping(path="/{id}")
    public @ResponseBody ResponseEntity<?> deleteCar(@PathVariable Integer id) {
        Optional<Car> car = carRepository.findById(id);
        if (car.isPresent()) {
            carRepository.deleteById(id);
            return ResponseEntity.ok("Car with id " + id + " deleted.");
        } else {
            return ResponseEntity.badRequest().body("No Car found with id: " + id);
        }
    }

    @GetMapping("/search/{key}")
    public ResponseEntity<?> searchCars(@PathVariable String key) {
        List<Car> cars = carRepository.findByBrandOrModelOrBodyOrPrice(
                key, key, key, key);

        if (cars.isEmpty()) {
            return ResponseEntity.ok("No cars found for keyword: " + key);
        }

        return ResponseEntity.ok(cars);
    }

}