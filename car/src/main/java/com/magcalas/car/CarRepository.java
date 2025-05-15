package com.magcalas.car;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CarRepository extends JpaRepository<Car, Integer> {
    List<Car> findByBrandOrModelOrBodyOrPrice(
            String brand, String model, String body, String price);
}