package com.gdsc.course.controller;

import com.gdsc.common.ApiResponse;
import com.gdsc.course.dto.CourseDto;
import com.gdsc.course.service.CourseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/courses")
@Tag(name = "Courses", description = "Course management APIs")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @GetMapping
    @Operation(summary = "Get all courses", description = "Retrieve all available courses")
    public ResponseEntity<ApiResponse<List<CourseDto>>> getAllCourses() {
        List<CourseDto> courses = courseService.getAllCourses();
        return ResponseEntity.ok(ApiResponse.success("Courses retrieved successfully", courses));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get course by ID", description = "Retrieve a specific course by its ID")
    public ResponseEntity<ApiResponse<CourseDto>> getCourseById(@PathVariable Long id) {
        CourseDto course = courseService.getCourseById(id);
        return ResponseEntity.ok(ApiResponse.success("Course retrieved successfully", course));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
    @Operation(summary = "Create new course", description = "Create a new course (Admin/Staff only)")
    public ResponseEntity<ApiResponse<CourseDto>> createCourse(@Valid @RequestBody CourseDto courseDto) {
        CourseDto createdCourse = courseService.createCourse(courseDto);
        return ResponseEntity.ok(ApiResponse.success("Course created successfully", createdCourse));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
    @Operation(summary = "Update course", description = "Update an existing course (Admin/Staff only)")
    public ResponseEntity<ApiResponse<CourseDto>> updateCourse(
            @PathVariable Long id, 
            @Valid @RequestBody CourseDto courseDto) {
        CourseDto updatedCourse = courseService.updateCourse(id, courseDto);
        return ResponseEntity.ok(ApiResponse.success("Course updated successfully", updatedCourse));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete course", description = "Delete a course (Admin only)")
    public ResponseEntity<ApiResponse<String>> deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
        return ResponseEntity.ok(ApiResponse.success("Course deleted successfully"));
    }

    @GetMapping("/category/{categoryId}")
    @Operation(summary = "Get courses by category", description = "Retrieve all courses in a specific category")
    public ResponseEntity<ApiResponse<List<CourseDto>>> getCoursesByCategory(@PathVariable Long categoryId) {
        List<CourseDto> courses = courseService.getCoursesByCategory(categoryId);
        return ResponseEntity.ok(ApiResponse.success("Courses retrieved successfully", courses));
    }

    @GetMapping("/search")
    @Operation(summary = "Search courses", description = "Search courses by keyword")
    public ResponseEntity<ApiResponse<List<CourseDto>>> searchCourses(@RequestParam String keyword) {
        List<CourseDto> courses = courseService.searchCourses(keyword);
        return ResponseEntity.ok(ApiResponse.success("Courses found successfully", courses));
    }
}
