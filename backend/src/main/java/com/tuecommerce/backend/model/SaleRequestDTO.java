package com.tuecommerce.backend.model;

import java.util.List;

public class SaleRequestDTO {
    private String user;
    private String name;
    private String lastname;
    private String address;
    private String phone;
    private double total;
    private PaymentDTO payment;
    private List<ProductDTO> products;

    // Getters y setters

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

    public PaymentDTO getPayment() {
        return payment;
    }

    public void setPayment(PaymentDTO payment) {
        this.payment = payment;
    }

    public List<ProductDTO> getProducts() {
        return products;
    }

    public void setProducts(List<ProductDTO> products) {
        this.products = products;
    }

    public static class PaymentDTO {
        private String type;
        private String cardNumber;
        private String expiry;
        private String cvv;
        // Getters y setters

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }

        public String getCardNumber() {
            return cardNumber;
        }

        public void setCardNumber(String cardNumber) {
            this.cardNumber = cardNumber;
        }

        public String getExpiry() {
            return expiry;
        }

        public void setExpiry(String expiry) {
            this.expiry = expiry;
        }

        public String getCvv() {
            return cvv;
        }

        public void setCvv(String cvv) {
            this.cvv = cvv;
        }
    }

    public static class ProductDTO {
        private Long productId;
        private String name;
        private double price;
        private int quantity;
        private String size;
        // Getters y setters

        public Long getProductId() {
            return productId;
        }

        public void setProductId(Long productId) {
            this.productId = productId;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public double getPrice() {
            return price;
        }

        public void setPrice(double price) {
            this.price = price;
        }

        public int getQuantity() {
            return quantity;
        }

        public void setQuantity(int quantity) {
            this.quantity = quantity;
        }

        public String getSize() {
            return size;
        }

        public void setSize(String size) {
            this.size = size;
        }
    }
}