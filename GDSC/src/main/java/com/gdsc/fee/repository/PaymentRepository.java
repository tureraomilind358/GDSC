package com.gdsc.fee.repository;

import com.gdsc.fee.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    
    List<Payment> findByFee_Student_Id(Long studentId);
//
//    List<Payment> findByFeeId(Long feeId);
//
//    List<Payment> findByStatus(String status);
    
    List<Payment> findByCenterId(Long centerId);
} 
