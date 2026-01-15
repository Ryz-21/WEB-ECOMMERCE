package com.tuecommerce.backend.interfaces;

public class PaymentDTO {
    private String paymentIntentId;
    // Getters y setters

    public String getPaymentIntentId() {
        return paymentIntentId;
    }

    public void setPaymentIntentId(String paymentIntentId) {
        this.paymentIntentId = paymentIntentId;
    }
}
