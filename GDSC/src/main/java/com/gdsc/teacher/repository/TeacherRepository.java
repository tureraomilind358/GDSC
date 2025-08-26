package com.gdsc.teacher.repository;

import com.gdsc.teacher.entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Long> {
    
    @Query("SELECT t FROM Teacher t WHERE " +
           "LOWER(t.firstName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(t.lastName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(t.email) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(t.expertise) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Teacher> searchTeachers(@Param("keyword") String keyword);
    
    List<Teacher> findByCenterId(Long centerId);
    
    List<Teacher> findByExpertise(String expertise);
    
    List<Teacher> findByStatus(String status);
}
