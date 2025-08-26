package com.gdsc.teacher.controller;

import com.gdsc.common.ApiResponse;
import com.gdsc.teacher.dto.TeacherDto;
import com.gdsc.teacher.service.TeacherService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/teachers")
@Tag(name = "Teachers", description = "Teacher management APIs")
public class TeacherController {

    @Autowired
    private TeacherService teacherService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
    @Operation(summary = "Get all teachers", description = "Retrieve all teachers (Admin/Staff only)")
    public ResponseEntity<ApiResponse<List<TeacherDto>>> getAllTeachers() {
        List<TeacherDto> teachers = teacherService.getAllTeachers();
        return ResponseEntity.ok(ApiResponse.success("Teachers retrieved successfully", teachers));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF') or @teacherSecurityService.isOwner(#id)")
    @Operation(summary = "Get teacher by ID", description = "Retrieve a specific teacher by ID")
    public ResponseEntity<ApiResponse<TeacherDto>> getTeacherById(@PathVariable Long id) {
        TeacherDto teacher = teacherService.getTeacherById(id);
        return ResponseEntity.ok(ApiResponse.success("Teacher retrieved successfully", teacher));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
    @Operation(summary = "Create new teacher", description = "Create a new teacher (Admin/Staff only)")
    public ResponseEntity<ApiResponse<TeacherDto>> createTeacher(@Valid @RequestBody TeacherDto teacherDto) {
        TeacherDto createdTeacher = teacherService.createTeacher(teacherDto);
        return ResponseEntity.ok(ApiResponse.success("Teacher created successfully", createdTeacher));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF') or @teacherSecurityService.isOwner(#id)")
    @Operation(summary = "Update teacher", description = "Update an existing teacher")
    public ResponseEntity<ApiResponse<TeacherDto>> updateTeacher(
            @PathVariable Long id, 
            @Valid @RequestBody TeacherDto teacherDto) {
        TeacherDto updatedTeacher = teacherService.updateTeacher(id, teacherDto);
        return ResponseEntity.ok(ApiResponse.success("Teacher updated successfully", updatedTeacher));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete teacher", description = "Delete a teacher (Admin only)")
    public ResponseEntity<ApiResponse<String>> deleteTeacher(@PathVariable Long id) {
        teacherService.deleteTeacher(id);
        return ResponseEntity.ok(ApiResponse.success("Teacher deleted successfully"));
    }

    @GetMapping("/search")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
    @Operation(summary = "Search teachers", description = "Search teachers by keyword (Admin/Staff only)")
    public ResponseEntity<ApiResponse<List<TeacherDto>>> searchTeachers(@RequestParam String keyword) {
        List<TeacherDto> teachers = teacherService.searchTeachers(keyword);
        return ResponseEntity.ok(ApiResponse.success("Teachers found successfully", teachers));
    }

    @GetMapping("/{id}/courses")
    @Operation(summary = "Get teacher courses", description = "Get all courses assigned to a teacher")
    public ResponseEntity<ApiResponse<List<Object>>> getTeacherCourses(@PathVariable Long id) {
        List<Object> courses = new java.util.ArrayList<>();
        return ResponseEntity.ok(ApiResponse.success("Teacher courses retrieved successfully", courses));
    }
}
