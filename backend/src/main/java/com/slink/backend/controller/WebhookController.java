package com.slink.backend.controller;

import com.slink.backend.service.SubscriptionService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/webhooks")
public class WebhookController {

    private final SubscriptionService subscriptionService;

    @Value("${razorpay.webhook.secret}")
    private String webhookSecret;

    public WebhookController(SubscriptionService subscriptionService) {
        this.subscriptionService = subscriptionService;
    }

    @PostMapping("/razorpay")
    public ResponseEntity<?> handleRazorpayWebhook(
            @RequestBody String payload,
            @RequestHeader("X-Razorpay-Signature") String signature) {

        if (subscriptionService.verifyWebhook(payload, signature, webhookSecret)) {
            JSONObject json = new JSONObject(payload);
            String event = json.optString("event");
            JSONObject payloadJson = json.optJSONObject("payload");

            if (payloadJson != null) {
                if ("subscription.charged".equals(event)) {
                    JSONObject subscription = payloadJson.optJSONObject("subscription");
                    if (subscription != null) {
                        String subId = subscription.optString("entity") != null ? subscription.optJSONObject("entity").optString("id") : subscription.optString("id");
                        // subscription entity might be nested depending on the event
                        if (subId == null || subId.isEmpty()) {
                            subId = subscription.optString("id");
                        }
                        
                        long currentPeriodEnd = subscription.optLong("current_end");
                        String planId = subscription.optString("plan_id");
                        
                        // Map planId back to planType if needed, or stick to what we know
                        String planType = planId.contains("PRO") ? "PRO" : "ELITE";

                        subscriptionService.updateSubscriptionStatus(subId, "active", currentPeriodEnd, planType);
                    }
                } else if ("subscription.cancelled".equals(event) || "subscription.expired".equals(event)) {
                    JSONObject subscription = payloadJson.optJSONObject("subscription");
                    if (subscription != null) {
                        String subId = subscription.optString("id");
                        subscriptionService.updateSubscriptionStatus(subId, "inactive", 0L, "FREE");
                    }
                }
            }
            return ResponseEntity.ok("Webhook processed");
        } else {
            return ResponseEntity.status(401).body("Invalid signature");
        }
    }
}
