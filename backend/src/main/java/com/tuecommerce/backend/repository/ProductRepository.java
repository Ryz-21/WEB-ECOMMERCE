package com.tuecommerce.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tuecommerce.backend.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}