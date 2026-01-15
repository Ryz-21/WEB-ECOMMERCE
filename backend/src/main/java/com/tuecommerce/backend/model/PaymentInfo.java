package com.tuecommerce.backend.model;

import jakarta.persistence.Embeddable;

@Embeddable
public class PaymentInfo {
    private String paymentIntentId;
    private String paymentStatus; // PENDING, SUCCEEDED, FAILED

    public String getPaymentIntentId() {
        return paymentIntentId;
    }

    public void setPaymentIntentId(String paymentIntentId) {
        this.paymentIntentId = paymentIntentId;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }
}
