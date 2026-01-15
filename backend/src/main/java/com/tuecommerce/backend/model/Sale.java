package com.tuecommerce.backend.model;


import java.util.List;
import java.util.UUID;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;


@Entity
public class Sale {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String user;
    private String guestToken;
    private String name;
    private String lastname;
    private String address;
    private String phone;
    private double total;

    @Embedded
    private PaymentInfo payment;

    @OneToMany(mappedBy = "sale", cascade = CascadeType.ALL)
    private List<SaleItem> items;

    @PrePersist
    public void generateGuestTokenIfNeeded() {
        if (this.user == null || this.user.trim().isEmpty()) {
            this.guestToken = "GUEST_" + UUID.randomUUID().toString();
            this.user = this.guestToken;
        }
    }

    // Getters y setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public PaymentInfo getPayment() {
        return payment;
    }

    public void setPayment(PaymentInfo payment) {
        this.payment = payment;
    }

    public List<SaleItem> getItems() {
        return items;
    }

    public void setItems(List<SaleItem> items) {
        this.items = items;
    }

    public String getGuestToken() {
        return guestToken;
    }

    public void setGuestToken(String guestToken) {
        this.guestToken = guestToken;
    }
}