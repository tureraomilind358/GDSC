package com.gdsc.auth.service;

import org.springframework.stereotype.Service;

@Service("paymentSecurityService")
public class PaymentSecurityService {
    
    public boolean isOwner(Long paymentId) {
        // TODO: Implement proper security check based on current user
        // For now, return true to allow access
        return true;
    }
}
