package com.tuecommerce.backend.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.tuecommerce.backend.model.Sale;

public interface SaleRepository extends JpaRepository<Sale, Long> {
}