package com.gdsc.exam.controller;

import com.gdsc.common.ApiResponse;
import com.gdsc.exam.dto.ExamDto;
import com.gdsc.exam.dto.QuestionDto;
import com.gdsc.exam.dto.ExamResultDto;
import com.gdsc.exam.service.ExamService;
import com.gdsc.exam.service.QuestionService;
import com.gdsc.exam.service.ExamResultService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/exams")
@Tag(name = "Exams", description = "Exam management APIs")
public class ExamController {

    @Autowired
    private ExamService examService;

    @Autowired
    private QuestionService questionService;

    @Autowired
    private ExamResultService examResultService;

    // Exam Management Endpoints
    @GetMapping
    @Operation(summary = "Get all exams", description = "Retrieve all available exams")
    public ResponseEntity<ApiResponse<List<ExamDto>>> getAllExams() {
        List<ExamDto> exams = examService.getAllExams();
        return ResponseEntity.ok(ApiResponse.success("Exams retrieved successfully", exams));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get exam by ID", description = "Retrieve a specific exam by ID")
    public ResponseEntity<ApiResponse<ExamDto>> getExamById(@PathVariable Long id) {
        ExamDto exam = examService.getExamById(id);
        return ResponseEntity.ok(ApiResponse.success("Exam retrieved successfully", exam));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('TEACHER')")
    @Operation(summary = "Create new exam", description = "Create a new exam (Admin/Teacher only)")
    public ResponseEntity<ApiResponse<ExamDto>> createExam(@Valid @RequestBody ExamDto examDto) {
        ExamDto createdExam = examService.createExam(examDto);
        return ResponseEntity.ok(ApiResponse.success("Exam created successfully", createdExam));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('TEACHER')")
    @Operation(summary = "Update exam", description = "Update an existing exam (Admin/Teacher only)")
    public ResponseEntity<ApiResponse<ExamDto>> updateExam(
            @PathVariable Long id, 
            @Valid @RequestBody ExamDto examDto) {
        ExamDto updatedExam = examService.updateExam(id, examDto);
        return ResponseEntity.ok(ApiResponse.success("Exam updated successfully", updatedExam));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete exam", description = "Delete an exam (Admin only)")
    public ResponseEntity<ApiResponse<String>> deleteExam(@PathVariable Long id) {
        examService.deleteExam(id);
        return ResponseEntity.ok(ApiResponse.success("Exam deleted successfully"));
    }

    @GetMapping("/course/{courseId}")
    @Operation(summary = "Get course exams", description = "Get all exams for a specific course")
    public ResponseEntity<ApiResponse<List<ExamDto>>> getCourseExams(@PathVariable Long courseId) {
        List<ExamDto> exams = examService.getExamsByCourse(courseId);
        return ResponseEntity.ok(ApiResponse.success("Course exams retrieved successfully", exams));
    }

    @GetMapping("/student/{studentId}")
    @Operation(summary = "Get student exams", description = "Get all exams assigned to a student")
    public ResponseEntity<ApiResponse<List<ExamDto>>> getStudentExams(@PathVariable Long studentId) {
        List<ExamDto> exams = examService.getExamsByStudent(studentId);
        return ResponseEntity.ok(ApiResponse.success("Student exams retrieved successfully", exams));
    }

    // Question Management Endpoints
    @GetMapping("/{examId}/questions")
    @Operation(summary = "Get exam questions", description = "Get all questions for a specific exam")
    public ResponseEntity<ApiResponse<List<QuestionDto>>> getExamQuestions(@PathVariable Long examId) {
        List<QuestionDto> questions = questionService.getQuestionsByExam(examId);
        return ResponseEntity.ok(ApiResponse.success("Exam questions retrieved successfully", questions));
    }

    @PostMapping("/{examId}/questions")
    @PreAuthorize("hasRole('ADMIN') or hasRole('TEACHER')")
    @Operation(summary = "Add question to exam", description = "Add a new question to an exam")
    public ResponseEntity<ApiResponse<QuestionDto>> addQuestion(
            @PathVariable Long examId, 
            @Valid @RequestBody QuestionDto questionDto) {
        QuestionDto createdQuestion = questionService.addQuestionToExam(examId, questionDto);
        return ResponseEntity.ok(ApiResponse.success("Question added successfully", createdQuestion));
    }

    @PutMapping("/questions/{questionId}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('TEACHER')")
    @Operation(summary = "Update question", description = "Update an existing question")
    public ResponseEntity<ApiResponse<QuestionDto>> updateQuestion(
            @PathVariable Long questionId, 
            @Valid @RequestBody QuestionDto questionDto) {
        QuestionDto updatedQuestion = questionService.updateQuestion(questionId, questionDto);
        return ResponseEntity.ok(ApiResponse.success("Question updated successfully", updatedQuestion));
    }

    @DeleteMapping("/questions/{questionId}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('TEACHER')")
    @Operation(summary = "Delete question", description = "Delete a question")
    public ResponseEntity<ApiResponse<String>> deleteQuestion(@PathVariable Long questionId) {
        questionService.deleteQuestion(questionId);
        return ResponseEntity.ok(ApiResponse.success("Question deleted successfully"));
    }

    // Exam Result Endpoints
    @GetMapping("/{examId}/results")
    @PreAuthorize("hasRole('ADMIN') or hasRole('TEACHER')")
    @Operation(summary = "Get exam results", description = "Get all results for a specific exam")
    public ResponseEntity<ApiResponse<List<ExamResultDto>>> getExamResults(@PathVariable Long examId) {
        List<ExamResultDto> results = examResultService.getResultsByExam(examId);
        return ResponseEntity.ok(ApiResponse.success("Exam results retrieved successfully", results));
    }

    @GetMapping("/results/student/{studentId}")
    @Operation(summary = "Get student results", description = "Get all exam results for a student")
    public ResponseEntity<ApiResponse<List<ExamResultDto>>> getStudentResults(@PathVariable Long studentId) {
        List<ExamResultDto> results = examResultService.getResultsByStudent(studentId);
        return ResponseEntity.ok(ApiResponse.success("Student results retrieved successfully", results));
    }

    @PostMapping("/{examId}/evaluate")
    @PreAuthorize("hasRole('ADMIN') or hasRole('TEACHER')")
    @Operation(summary = "Evaluate exam", description = "Evaluate and grade an exam")
    public ResponseEntity<ApiResponse<String>> evaluateExam(@PathVariable Long examId) {
        examService.evaluateExam(examId);
        return ResponseEntity.ok(ApiResponse.success("Exam evaluated successfully"));
    }

    @PostMapping("/{examId}/submit")
    @Operation(summary = "Submit exam", description = "Submit exam answers for evaluation")
    public ResponseEntity<ApiResponse<String>> submitExam(
            @PathVariable Long examId, 
            @RequestBody Object answers) {
        examService.submitExam(examId, answers);
        return ResponseEntity.ok(ApiResponse.success("Exam submitted successfully"));
    }
}
