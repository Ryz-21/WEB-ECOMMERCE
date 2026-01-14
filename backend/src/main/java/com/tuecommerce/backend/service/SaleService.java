package com.tuecommerce.backend.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.tuecommerce.backend.interfaces.SaleRequestDTO;
import com.tuecommerce.backend.model.PaymentInfo;
import com.tuecommerce.backend.model.Sale;
import com.tuecommerce.backend.model.SaleItem;
import com.tuecommerce.backend.repository.SaleRepository;

@Service
public class SaleService {

    private final SaleRepository saleRepository;

    public SaleService(SaleRepository saleRepository) {
        this.saleRepository = saleRepository;
    }

    public Sale createSale(SaleRequestDTO dto) {
        Sale sale = new Sale();
        sale.setUser(dto.getUser());
        sale.setName(dto.getName());
        sale.setLastname(dto.getLastname());
        sale.setAddress(dto.getAddress());
        sale.setPhone(dto.getPhone());
        sale.setTotal(dto.getTotal());

        PaymentInfo payment = new PaymentInfo();
        payment.setPaymentIntentId(dto.getPayment().getPaymentIntentId());
        sale.setPayment(payment);

        List<SaleItem> items = dto.getProducts().stream().map(p -> {
            SaleItem item = new SaleItem();
            item.setProductId(p.getProductId());
            item.setName(p.getName());
            item.setPrice(p.getPrice());
            item.setQuantity(p.getQuantity());
            item.setSize(p.getSize());
            item.setSale(sale);
            return item;
        }).collect(Collectors.toList());

        sale.setItems(items);

        return saleRepository.save(sale);
    }

    public List<Sale> getAllSales() {
    return saleRepository.findAll();
}

public Optional<Sale> updateSale(Long id, Sale updatedSale) {
    return saleRepository.findById(id).map(sale -> {
        sale.setAddress(updatedSale.getAddress());
        sale.setPhone(updatedSale.getPhone());
        return saleRepository.save(sale);
    });
}

public boolean deleteSale(Long id) {
    if (!saleRepository.existsById(id)) return false;
    saleRepository.deleteById(id);
    return true;
}

}
