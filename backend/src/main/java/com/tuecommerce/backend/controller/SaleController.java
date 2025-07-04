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

import com.tuecommerce.backend.model.Sale;
import com.tuecommerce.backend.model.SaleRequestDTO;
import com.tuecommerce.backend.service.SaleService;

@RestController
@RequestMapping("/api/sales")
@CrossOrigin(origins = "*") // Habilita CORS si el frontend está en otro puerto
public class SaleController {

    private final SaleService saleService;

    public SaleController(SaleService saleService) {
        this.saleService = saleService;
    }

    @PostMapping
    public ResponseEntity<?> createSale(@RequestBody SaleRequestDTO dto) {
        try {
            Sale sale = saleService.createSale(dto);
            return ResponseEntity.ok(sale);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al procesar la venta: " + e.getMessage());
        }
    }

    @GetMapping
public List<Sale> getAllSales() {
    return saleService.getAllSales();
}

@PutMapping("/{id}")
public ResponseEntity<?> updateSale(@PathVariable Long id, @RequestBody Sale updatedSale) {
    return saleService.updateSale(id, updatedSale)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
}

@DeleteMapping("/{id}")
public ResponseEntity<?> deleteSale(@PathVariable Long id) {
    if (!saleService.deleteSale(id)) {
        return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok().build();
}

}
