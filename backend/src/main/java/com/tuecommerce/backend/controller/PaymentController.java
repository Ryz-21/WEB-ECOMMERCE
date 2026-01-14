package com.tuecommerce.backend.controller;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.tuecommerce.backend.service.PaymentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/create-intent")
    public ResponseEntity<?> createPaymentIntent(@RequestParam Long amount, @RequestParam String currency) {
        try {
            PaymentIntent intent = paymentService.createPaymentIntent(amount, currency);
            return ResponseEntity.ok(intent.toJson());
        } catch (StripeException e) {
            return ResponseEntity.badRequest().body("Error creando payment intent: " + e.getMessage());
        }
    }

    @PostMapping("/confirm-intent")
    public ResponseEntity<?> confirmPaymentIntent(@RequestParam String paymentIntentId) {
        try {
            PaymentIntent intent = paymentService.confirmPaymentIntent(paymentIntentId);
            return ResponseEntity.ok(intent.toJson());
        } catch (StripeException e) {
            return ResponseEntity.badRequest().body("Error confirmando payment intent: " + e.getMessage());
        }
    }
}