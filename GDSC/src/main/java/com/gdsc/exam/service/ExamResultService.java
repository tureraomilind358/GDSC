package com.gdsc.exam.service;

import com.gdsc.exam.dto.ExamResultDto;
import com.gdsc.exam.entity.ExamResult;
import com.gdsc.exam.repository.ExamResultRepository;
import com.gdsc.common.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExamResultService {

    @Autowired
    private ExamResultRepository examResultRepository;

    public List<ExamResultDto> getResultsByExam(Long examId) {
        return examResultRepository.findByExamId(examId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<ExamResultDto> getResultsByStudent(Long studentId) {
        return examResultRepository.findByStudent_Id(studentId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private ExamResultDto convertToDto(ExamResult result) {
        ExamResultDto dto = new ExamResultDto();
        dto.setId(result.getId());
        dto.setStudentId(result.getStudent().getId());
        dto.setExamId(result.getExam().getId());
        dto.setObtainedMarks(result.getObtainedMarks());
        dto.setTotalMarks(result.getTotalMarks());
        dto.setPercentage(result.getPercentage());
        dto.setGrade(result.getGrade());
        dto.setStatus(result.getResultStatus().name());
        dto.setSubmissionDate(result.getExamStartTime());
        dto.setEvaluationDate(result.getEvaluationDate());
        dto.setRemarks(result.getRemarks());
        return dto;
    }
} 
