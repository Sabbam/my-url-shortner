package com.slink.backend.controller;

import com.razorpay.RazorpayException;
import com.slink.backend.service.SubscriptionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/subscriptions")
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    // Mapping of plan types to Razorpay Plan IDs
    // Note: These should ideally be in application.properties
    private final Map<String, String> planIdMap = new HashMap<>() {{
        put("PRO", "plan_SZqdWHHyra0tHH"); // PREMIUM PLUS
        put("ELITE", "plan_SZqddv7Z5mDCvk"); // ELITE BRAND
    }};

    public SubscriptionController(SubscriptionService subscriptionService) {
        this.subscriptionService = subscriptionService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createSubscription(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String planType = request.get("planType");
        
        String planId = planIdMap.get(planType);
        if (planId == null) {
            return ResponseEntity.badRequest().body("Invalid plan type");
        }

        try {
            String subscriptionId = subscriptionService.createSubscription(email, planId);
            Map<String, String> response = new HashMap<>();
            response.put("subscriptionId", subscriptionId);
            return ResponseEntity.ok(response);
        } catch (RazorpayException e) {
            return ResponseEntity.internalServerError().body("Error creating subscription: " + e.getMessage());
        }
    }
}
