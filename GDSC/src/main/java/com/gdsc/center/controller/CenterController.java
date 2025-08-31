package com.gdsc.center.controller;

import com.gdsc.common.ApiResponse;
import com.gdsc.center.dto.CenterDto;
import com.gdsc.center.service.CenterService;
import com.gdsc.center.dto.CenterRegistrationRequest;
import com.gdsc.center.dto.CenterRegistrationResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/centers")
@Tag(name = "Centers", description = "Center/Branch management APIs")
public class CenterController {

    @Autowired
    private CenterService centerService;

    @GetMapping
    @Operation(summary = "Get all centers", description = "Retrieve all available centers")
    public ResponseEntity<ApiResponse<List<CenterDto>>> getAllCenters() {
        List<CenterDto> centers = centerService.getAllCenters();
        return ResponseEntity.ok(ApiResponse.success("Centers retrieved successfully", centers));
    }

    @PostMapping("/register")
    @Operation(summary = "Register center", description = "Public endpoint to register a new center and receive credentials")
    public ResponseEntity<ApiResponse<CenterRegistrationResponse>> registerCenter(@Valid @RequestBody CenterRegistrationRequest request) {
        CenterRegistrationResponse response = centerService.registerCenter(request);
        return ResponseEntity.ok(ApiResponse.success("Center registered successfully. Check your email for centerCode, centerUserName, tempPassword.", response));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get center by ID", description = "Retrieve a specific center by its ID")
    public ResponseEntity<ApiResponse<CenterDto>> getCenterById(@PathVariable Long id) {
        CenterDto center = centerService.getCenterById(id);
        return ResponseEntity.ok(ApiResponse.success("Center retrieved successfully", center));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create new center", description = "Create a new center (Admin only)")
    public ResponseEntity<ApiResponse<CenterDto>> createCenter(@Valid @RequestBody CenterDto centerDto) {
        CenterDto createdCenter = centerService.createCenter(centerDto);
        return ResponseEntity.ok(ApiResponse.success("Center created successfully", createdCenter));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update center", description = "Update an existing center (Admin only)")
    public ResponseEntity<ApiResponse<CenterDto>> updateCenter(
            @PathVariable Long id, 
            @Valid @RequestBody CenterDto centerDto) {
        CenterDto updatedCenter = centerService.updateCenter(id, centerDto);
        return ResponseEntity.ok(ApiResponse.success("Center updated successfully", updatedCenter));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete center", description = "Delete a center (Admin only)")
    public ResponseEntity<ApiResponse<String>> deleteCenter(@PathVariable Long id) {
        centerService.deleteCenter(id);
        return ResponseEntity.ok(ApiResponse.success("Center deleted successfully"));
    }

    @GetMapping("/{id}/students")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
    @Operation(summary = "Get center students", description = "Get all students in a specific center")
    public ResponseEntity<ApiResponse<List<Object>>> getCenterStudents(@PathVariable Long id) {
        List<Object> students = centerService.getCenterStudents(id);
        return ResponseEntity.ok(ApiResponse.success("Center students retrieved successfully", students));
    }

    @GetMapping("/{id}/teachers")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
    @Operation(summary = "Get center teachers", description = "Get all teachers in a specific center")
    public ResponseEntity<ApiResponse<List<Object>>> getCenterTeachers(@PathVariable Long id) {
        List<Object> teachers = centerService.getCenterTeachers(id);
        return ResponseEntity.ok(ApiResponse.success("Center teachers retrieved successfully", teachers));
    }

    @GetMapping("/{id}/courses")
    @Operation(summary = "Get center courses", description = "Get all courses offered in a specific center")
    public ResponseEntity<ApiResponse<List<Object>>> getCenterCourses(@PathVariable Long id) {
        List<Object> courses = centerService.getCenterCourses(id);
        return ResponseEntity.ok(ApiResponse.success("Center courses retrieved successfully", courses));
    }
}
