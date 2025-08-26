package com.gdsc.auth.service;

import org.springframework.stereotype.Service;

@Service("feeSecurityService")
public class FeeSecurityService {
    
    public boolean isOwner(Long feeId) {
        // TODO: Implement proper security check based on current user
        // For now, return true to allow access
        return true;
    }
}
