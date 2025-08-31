package com.gdsc.exam.service;

import com.gdsc.exam.dto.ExamDto;
import com.gdsc.exam.entity.Exam;
import com.gdsc.exam.repository.ExamRepository;
import com.gdsc.common.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExamService {

    @Autowired
    private ExamRepository examRepository;

    public List<ExamDto> getAllExams() {
        return examRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public ExamDto getExamById(Long id) {
        Exam exam = examRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Exam", "id", id));
        return convertToDto(exam);
    }

    public ExamDto createExam(ExamDto examDto) {
        Exam exam = convertToEntity(examDto);
        Exam savedExam = examRepository.save(exam);
        return convertToDto(savedExam);
    }

    public ExamDto updateExam(Long id, ExamDto examDto) {
        Exam existingExam = examRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Exam", "id", id));
        
        // Update fields
        existingExam.setName(examDto.getName());
        existingExam.setDescription(examDto.getDescription());
        existingExam.setExamDate(examDto.getExamDate());
        existingExam.setDurationMinutes(examDto.getDuration());
        existingExam.setExamType(Exam.ExamType.valueOf(examDto.getType()));
        existingExam.setTotalMarks(examDto.getTotalMarks());
        existingExam.setIsOnline(examDto.getIsOnline());
        
        Exam updatedExam = examRepository.save(existingExam);
        return convertToDto(updatedExam);
    }

    public void deleteExam(Long id) {
        if (!examRepository.existsById(id)) {
            throw new ResourceNotFoundException("Exam", "id", id);
        }
        examRepository.deleteById(id);
    }

    public List<ExamDto> getExamsByCourse(Long courseId) {
        return examRepository.findByCourseId(courseId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<ExamDto> getExamsByStudent(Long studentId) {
        return examRepository.findByAssignedStudents_Id(studentId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<ExamDto> getExamsByCenter(Long centerId) {
        return examRepository.findByCenterId(centerId).stream()
                .map(this::convertToDto)
                .collect(java.util.stream.Collectors.toList());
    }

    public void evaluateExam(Long examId) {
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new ResourceNotFoundException("Exam", "id", examId));
        
        // TODO: Implement exam evaluation logic
        // This would involve:
        // 1. Getting all student answers for this exam
        // 2. Comparing with correct answers
        // 3. Calculating scores
        // 4. Generating results
    }

    public void submitExam(Long examId, Object answers) {
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new ResourceNotFoundException("Exam", "id", examId));
        
        // TODO: Implement exam submission logic
        // This would involve:
        // 1. Validating exam is still open
        // 2. Storing student answers
        // 3. Recording submission time
        // 4. Triggering evaluation if auto-evaluation is enabled
    }

    private ExamDto convertToDto(Exam exam) {
        ExamDto dto = new ExamDto();
        dto.setId(exam.getId());
        dto.setName(exam.getName());
        dto.setDescription(exam.getDescription());
        dto.setExamDate(exam.getExamDate());
        dto.setDuration(exam.getDurationMinutes());
        dto.setType(exam.getExamType().name());
        dto.setTotalMarks(exam.getTotalMarks());
        dto.setIsOnline(exam.getIsOnline());
        if (exam.getCourse() != null) {
            dto.setCourseId(exam.getCourse().getId());
        }
        if (exam.getCenter() != null) {
            dto.setCenterId(exam.getCenter().getId());
        }
        return dto;
    }

    private Exam convertToEntity(ExamDto dto) {
        Exam exam = new Exam();
        exam.setName(dto.getName());
        exam.setDescription(dto.getDescription());
        exam.setExamDate(dto.getExamDate());
        exam.setDurationMinutes(dto.getDuration());
        exam.setExamType(Exam.ExamType.valueOf(dto.getType()));
        exam.setTotalMarks(dto.getTotalMarks());
        exam.setIsOnline(dto.getIsOnline());
        return exam;
    }
} 
