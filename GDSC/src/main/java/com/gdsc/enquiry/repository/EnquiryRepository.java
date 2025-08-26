package com.gdsc.enquiry.repository;

import com.gdsc.enquiry.entity.Enquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnquiryRepository extends JpaRepository<Enquiry, Long> {
    
    @Query("SELECT e FROM Enquiry e WHERE " +
           "LOWER(e.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(e.email) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(e.message) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Enquiry> searchEnquiries(@Param("keyword") String keyword);
    
    List<Enquiry> findByStatus(String status);
    
    List<Enquiry> findByCenterId(Long centerId);
    
    List<Enquiry> findByInterestedCourseId(Long courseId);
} 
