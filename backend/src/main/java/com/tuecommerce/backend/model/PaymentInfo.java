package com.tuecommerce.backend.model;

import jakarta.persistence.Embeddable;

@Embeddable
public class PaymentInfo {
    private String paymentIntentId;

    public String getPaymentIntentId() {
        return paymentIntentId;
    }

    public void setPaymentIntentId(String paymentIntentId) {
        this.paymentIntentId = paymentIntentId;
    }
}
