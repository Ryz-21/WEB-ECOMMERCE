package com.tuecommerce.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tuecommerce.backend.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
