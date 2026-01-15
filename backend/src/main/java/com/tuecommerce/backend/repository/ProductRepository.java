package com.tuecommerce.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tuecommerce.backend.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
        List<Product> findByCategoryIgnoreCase(String category);
        List<Product> findByCategoryIgnoreCaseAndCategoryId(String category, Long categoryId);
}