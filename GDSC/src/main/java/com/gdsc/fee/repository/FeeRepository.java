package com.gdsc.fee.repository;

import com.gdsc.fee.entity.Fee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeeRepository extends JpaRepository<Fee, Long> {
    
    List<Fee> findByStudent_Id(Long studentId);
    
    List<Fee> findByCourseId(Long courseId);
    
    List<Fee> findByStatus(String status);
    
    List<Fee> findByCenterId(Long centerId);
} 
