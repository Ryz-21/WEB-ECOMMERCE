package com.tuecommerce.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tuecommerce.backend.model.Product;
import com.tuecommerce.backend.repository.ProductRepository;
import com.tuecommerce.backend.service.ProductService;


@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ProductController {

    private final ProductService productService;
     private final ProductRepository productRepository; 
         
     public ProductController(ProductService productService, ProductRepository productRepository) {
        this.productService = productService;
        this.productRepository = productRepository; // 👈 AÑADIDO
    }

    @GetMapping
    public List<Product> getAll() {
        return productService.findAll();
    }

    @PostMapping
    public ResponseEntity<Product> create(@RequestBody Product product) {
        return ResponseEntity.ok(productService.save(product));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> update(@PathVariable Long id, @RequestBody Product product) {
        return productService.findById(id).map(p -> {
            p.setName(product.getName());
            p.setCategory(product.getCategory());
            p.setCategoryId(product.getCategoryId());
            p.setPrice(product.getPrice());
            p.setStock(product.getStock());
            p.setSizes(product.getSizes());
            p.setImage(product.getImage());
            return ResponseEntity.ok(productService.save(p));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!productService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        productService.deleteById(id);
        return ResponseEntity.ok().build();
    }

@GetMapping("/accesorios")
public List<Product> getAccesorios() {
     return productRepository.findByCategoryIgnoreCase("accesorios");
}

@GetMapping("/accesorios/{categoryId}")
public List<Product> getAccesoriosByCategory(@PathVariable Long categoryId) {
    return productRepository.findByCategoryIgnoreCaseAndCategoryId("accesorios", categoryId);
}

@GetMapping("/mujerx")
public List<Product> getMujerProducts() {
    return productRepository.findByCategoryIgnoreCase("mujer");
}

@GetMapping("/mujerx/{categoryId}")
public List<Product> getMujerProductsByCategory(@PathVariable Long categoryId) {
    return productRepository.findByCategoryIgnoreCaseAndCategoryId("mujer", categoryId);
}

@GetMapping("/hombrex")
public List<Product> getHombreProducts() {
    return productRepository.findByCategoryIgnoreCase("hombre");
}

@GetMapping("/hombrex/{categoryId}")
public List<Product> getHombreProductsByCategory(@PathVariable Long categoryId) {
    return productRepository.findByCategoryIgnoreCaseAndCategoryId("hombre", categoryId);
}

@GetMapping("/ninosx")
public List<Product> getNinosProducts() {
    return productRepository.findByCategoryIgnoreCase("niños");
}

@GetMapping("/ninosx/{categoryId}")
public List<Product> getNinosProductsByCategory(@PathVariable Long categoryId) {
    return productRepository.findByCategoryIgnoreCaseAndCategoryId("niños", categoryId);
}


}
