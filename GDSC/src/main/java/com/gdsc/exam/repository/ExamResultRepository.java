package com.gdsc.exam.repository;

import com.gdsc.exam.entity.ExamResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExamResultRepository extends JpaRepository<ExamResult, Long> {
    
    List<ExamResult> findByExamId(Long examId);


    List<ExamResult> findByStudent_Id(Long studentId);
    
    List<ExamResult> findByResultStatus(ExamResult.ResultStatus resultStatus);
    
    List<ExamResult> findByCenterId(Long centerId);
} 
