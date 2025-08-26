package com.gdsc.exam.repository;

import com.gdsc.exam.entity.Exam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExamRepository extends JpaRepository<Exam, Long> {
    
    List<Exam> findByCourseId(Long courseId);
    
    List<Exam> findByAssignedStudents_Id(Long studentId);


    List<Exam> findByExamType(Exam.ExamType examType);
    
    List<Exam> findByIsOnline(Boolean isOnline);
    
    List<Exam> findByCenterId(Long centerId);
} 
