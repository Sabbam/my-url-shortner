package com.slink.backend.service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.slink.backend.model.User;
import com.slink.backend.repository.UserRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SubscriptionService {

    private final RazorpayClient razorpayClient;
    private final UserRepository userRepository;

    public SubscriptionService(
            @Value("${razorpay.key.id}") String keyId,
            @Value("${razorpay.key.secret}") String keySecret,
            UserRepository userRepository) throws RazorpayException {
        this.razorpayClient = new RazorpayClient(keyId, keySecret);
        this.userRepository = userRepository;
    }

    /**
     * Create a Razorpay subscription for a specific plan.
     * @param email User email
     * @param planId Razorpay Plan ID (e.g., plan_PKXxxx)
     * @return Subscription ID
     */
    public String createSubscription(String email, String planId) throws RazorpayException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        JSONObject subscriptionRequest = new JSONObject();
        subscriptionRequest.put("plan_id", planId);
        subscriptionRequest.put("total_count", 12); // For 1 year, or keep it high for indefinite
        subscriptionRequest.put("quantity", 1);
        subscriptionRequest.put("customer_notify", 1);
        // subscriptionRequest.put("start_at", ...); // Optional

        com.razorpay.Subscription subscription = razorpayClient.subscriptions.create(subscriptionRequest);
        String subscriptionId = subscription.get("id");

        // Update user with subscription ID (not active yet)
        user.setRzpSubscriptionId(subscriptionId);
        userRepository.save(user);

        return subscriptionId;
    }

    /**
     * Verify webhook signature.
     */
    public boolean verifyWebhook(String payload, String signature, String secret) {
        try {
            return com.razorpay.Utils.verifyWebhookSignature(payload, signature, secret);
        } catch (RazorpayException e) {
            return false;
        }
    }

    public void updateSubscriptionStatus(String subscriptionId, String status, Long currentPeriodEnd, String planType) {
        Optional<User> userOpt = userRepository.findByRzpSubscriptionId(subscriptionId);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setSubscriptionStatus(status);
            user.setCurrentPeriodEnd(currentPeriodEnd);
            if (status.equals("active")) {
                user.setPlanType(planType);
            } else if (status.equals("expired") || status.equals("cancelled")) {
                user.setPlanType("FREE");
            }
            userRepository.save(user);
        }
    }
}
