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

    @Value("${razorpay.plan.pro}")
    private String proPlanId;

    @Value("${razorpay.plan.elite}")
    private String elitePlanId;

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
                if ("subscription.charged".equals(event) || "subscription.activated".equals(event) || "subscription.authenticated".equals(event)) {
                    JSONObject subscription = payloadJson.optJSONObject("subscription");
                    if (subscription != null) {
                        // Extract subscription details (handle potential nesting)
                        JSONObject entity = subscription.optJSONObject("entity");
                        JSONObject subData = (entity != null) ? entity : subscription;
                        
                        String subId = subData.optString("id");
                        long currentPeriodEnd = subData.optLong("current_end");
                        String planId = subData.optString("plan_id");
                        
                        // Robust mapping of planId to planType
                        String planType = "FREE";
                        if (planId.equals(proPlanId)) {
                            planType = "PRO";
                        } else if (planId.equals(elitePlanId)) {
                            planType = "ELITE";
                        }

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
