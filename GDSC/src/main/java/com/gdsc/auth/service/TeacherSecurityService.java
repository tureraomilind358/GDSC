package com.gdsc.auth.service;

import org.springframework.stereotype.Service;

@Service("teacherSecurityService")
public class TeacherSecurityService {
    
    public boolean isOwner(Long teacherId) {
        // TODO: Implement proper security check based on current user
        // For now, return true to allow access
        return true;
    }
}
