package com.gdsc.controller;

import com.gdsc.common.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/working")
@Tag(name = "Working API", description = "Basic working endpoints for testing")
public class WorkingController {

    @GetMapping("/health")
    @Operation(summary = "Health check", description = "Check if the API is running")
    public ApiResponse<String> health() {
        return ApiResponse.success("Institute Management System is running!");
    }

    @GetMapping("/courses")
    @Operation(summary = "Get courses", description = "Get list of courses")
    public ApiResponse<Map<String, Object>> getCourses() {
        Map<String, Object> courses = new HashMap<>();
        courses.put("message", "Courses endpoint working!");
        courses.put("status", "success");
        return ApiResponse.success("Courses retrieved successfully", courses);
    }

    @GetMapping("/students")
    @Operation(summary = "Get students", description = "Get list of students")
    public ApiResponse<Map<String, Object>> getStudents() {
        Map<String, Object> students = new HashMap<>();
        students.put("message", "Students endpoint working!");
        students.put("status", "success");
        return ApiResponse.success("Students retrieved successfully", students);
    }

    @GetMapping("/teachers")
    @Operation(summary = "Get teachers", description = "Get list of teachers")
    public ApiResponse<Map<String, Object>> getTeachers() {
        Map<String, Object> teachers = new HashMap<>();
        teachers.put("message", "Teachers endpoint working!");
        teachers.put("status", "success");
        return ApiResponse.success("Teachers retrieved successfully", teachers);
    }

    @PostMapping("/test")
    @Operation(summary = "Test POST", description = "Test POST endpoint")
    public ApiResponse<Map<String, Object>> testPost(@RequestBody Map<String, Object> request) {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "POST endpoint working!");
        response.put("received", request);
        response.put("status", "success");
        return ApiResponse.success("POST request processed successfully", response);
    }
}
