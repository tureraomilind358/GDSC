package com.gdsc.student.controller;

import com.gdsc.common.ApiResponse;
import com.gdsc.student.dto.StudentDto;
import com.gdsc.student.service.StudentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
@Tag(name = "Students", description = "Student management APIs")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
    @Operation(summary = "Get all students", description = "Retrieve all students (Admin/Staff only)")
    public ResponseEntity<ApiResponse<List<StudentDto>>> getAllStudents() {
        List<StudentDto> students = studentService.getAllStudents();
        return ResponseEntity.ok(ApiResponse.success("Students retrieved successfully", students));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF') or @studentSecurityService.isOwner(#id)")
    @Operation(summary = "Get student by ID", description = "Retrieve a specific student by ID")
    public ResponseEntity<ApiResponse<StudentDto>> getStudentById(@PathVariable Long id) {
        StudentDto student = studentService.getStudentById(id);
        return ResponseEntity.ok(ApiResponse.success("Student retrieved successfully", student));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
    @Operation(summary = "Create new student", description = "Create a new student (Admin/Staff only)")
    public ResponseEntity<ApiResponse<StudentDto>> createStudent(@Valid @RequestBody StudentDto studentDto) {
        StudentDto createdStudent = studentService.createStudent(studentDto);
        return ResponseEntity.ok(ApiResponse.success("Student created successfully", createdStudent));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF') or @studentSecurityService.isOwner(#id)")
    @Operation(summary = "Update student", description = "Update an existing student")
    public ResponseEntity<ApiResponse<StudentDto>> updateStudent(
            @PathVariable Long id, 
            @Valid @RequestBody StudentDto studentDto) {
        StudentDto updatedStudent = studentService.updateStudent(id, studentDto);
        return ResponseEntity.ok(ApiResponse.success("Student updated successfully", updatedStudent));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete student", description = "Delete a student (Admin only)")
    public ResponseEntity<ApiResponse<String>> deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return ResponseEntity.ok(ApiResponse.success("Student deleted successfully"));
    }

    @GetMapping("/search")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
    @Operation(summary = "Search students", description = "Search students by keyword (Admin/Staff only)")
    public ResponseEntity<ApiResponse<List<StudentDto>>> searchStudents(@RequestParam String keyword) {
        List<StudentDto> students = studentService.searchStudents(keyword);
        return ResponseEntity.ok(ApiResponse.success("Students found successfully", students));
    }

    @GetMapping("/center/{centerId}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF') or hasRole('CENTER')")
    @Operation(summary = "Get center students", description = "Get all students for a specific center (Admin/Staff only)")
    public ResponseEntity<ApiResponse<List<StudentDto>>> getStudentsByCenter(@PathVariable Long centerId) {
        List<StudentDto> students = studentService.getStudentsByCenter(centerId);
        return ResponseEntity.ok(ApiResponse.success("Center students retrieved successfully", students));
    }
}
