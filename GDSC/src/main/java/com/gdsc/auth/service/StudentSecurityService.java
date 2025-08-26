package com.gdsc.auth.service;

import org.springframework.stereotype.Service;

@Service("studentSecurityService")
public class StudentSecurityService {
    
    public boolean isOwner(Long studentId) {
        // TODO: Implement proper security check based on current user
        // For now, return true to allow access
        return true;
    }
}
