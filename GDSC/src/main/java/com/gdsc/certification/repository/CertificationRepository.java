package com.gdsc.certification.repository;

import com.gdsc.certification.entity.Certification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CertificationRepository extends JpaRepository<Certification, Long> {
    
    List<Certification> findByStudent_Id(Long studentId);
    
    List<Certification> findByCourseId(Long courseId);
    
    List<Certification> findByStatus(String status);
    
    Optional<Certification> findByVerificationCode(String verificationCode);
    
    List<Certification> findByCenterId(Long centerId);
} 
