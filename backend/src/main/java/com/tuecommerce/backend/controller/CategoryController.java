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

import com.tuecommerce.backend.model.Category;
import com.tuecommerce.backend.service.CategoryService;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public List<Category> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestBody Category category) {
        return ResponseEntity.ok(categoryService.saveCategory(category));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable Long id, @RequestBody Category category) {
        return categoryService.getCategoryById(id)
            .map(existing -> {
                existing.setName(category.getName());
                existing.setTipo(category.getTipo());
                return ResponseEntity.ok(categoryService.saveCategory(existing));
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id) {
        if (categoryService.getCategoryById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        categoryService.deleteCategory(id);
        return ResponseEntity.ok().build();
    }
}
