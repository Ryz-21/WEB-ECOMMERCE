// src/main/java/com/tuecommerce/backend/service/ProductService.java
package com.tuecommerce.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.tuecommerce.backend.model.Product;
import com.tuecommerce.backend.repository.ProductRepository;

@Service
public class ProductService {
    private final ProductRepository productRepo;

    public ProductService(ProductRepository productRepo) {
        this.productRepo = productRepo;
    }

    public List<Product> findAll() {
        return productRepo.findAll();
    }

    public Product save(Product product) {
        return productRepo.save(product);
    }

    public Optional<Product> findById(Long id) {
        return productRepo.findById(id);
    }

    public void deleteById(Long id) {
        productRepo.deleteById(id);
    }
}