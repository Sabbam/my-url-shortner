package com.slink.backend.controller;

import com.razorpay.RazorpayException;
import com.slink.backend.service.SubscriptionService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/subscriptions")
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    private final Map<String, String> planIdMap = new HashMap<>();

    public SubscriptionController(
            SubscriptionService subscriptionService,
            @Value("${razorpay.plan.pro}") String proPlanId,
            @Value("${razorpay.plan.elite}") String elitePlanId) {
        this.subscriptionService = subscriptionService;
        planIdMap.put("PRO", proPlanId);
        planIdMap.put("ELITE", elitePlanId);
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
