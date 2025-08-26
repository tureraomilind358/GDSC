package com.gdsc.enquiry.controller;

import com.gdsc.common.ApiResponse;
import com.gdsc.enquiry.dto.EnquiryDto;
import com.gdsc.enquiry.service.EnquiryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/enquiries")
@Tag(name = "Enquiries", description = "Enquiry management APIs")
public class EnquiryController {

    @Autowired
    private EnquiryService enquiryService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
    @Operation(summary = "Get all enquiries", description = "Retrieve all enquiries (Admin/Staff only)")
    public ResponseEntity<ApiResponse<List<EnquiryDto>>> getAllEnquiries() {
        List<EnquiryDto> enquiries = enquiryService.getAllEnquiries();
        return ResponseEntity.ok(ApiResponse.success("Enquiries retrieved successfully", enquiries));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
    @Operation(summary = "Get enquiry by ID", description = "Retrieve a specific enquiry by ID")
    public ResponseEntity<ApiResponse<EnquiryDto>> getEnquiryById(@PathVariable Long id) {
        EnquiryDto enquiry = enquiryService.getEnquiryById(id);
        return ResponseEntity.ok(ApiResponse.success("Enquiry retrieved successfully", enquiry));
    }

    @PostMapping
    @Operation(summary = "Create new enquiry", description = "Create a new enquiry (Public access)")
    public ResponseEntity<ApiResponse<EnquiryDto>> createEnquiry(@Valid @RequestBody EnquiryDto enquiryDto) {
        EnquiryDto createdEnquiry = enquiryService.createEnquiry(enquiryDto);
        return ResponseEntity.ok(ApiResponse.success("Enquiry created successfully", createdEnquiry));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
    @Operation(summary = "Update enquiry", description = "Update an existing enquiry (Admin/Staff only)")
    public ResponseEntity<ApiResponse<EnquiryDto>> updateEnquiry(
            @PathVariable Long id, 
            @Valid @RequestBody EnquiryDto enquiryDto) {
        EnquiryDto updatedEnquiry = enquiryService.updateEnquiry(id, enquiryDto);
        return ResponseEntity.ok(ApiResponse.success("Enquiry updated successfully", updatedEnquiry));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete enquiry", description = "Delete an enquiry (Admin only)")
    public ResponseEntity<ApiResponse<String>> deleteEnquiry(@PathVariable Long id) {
        enquiryService.deleteEnquiry(id);
        return ResponseEntity.ok(ApiResponse.success("Enquiry deleted successfully"));
    }

    @GetMapping("/search")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
    @Operation(summary = "Search enquiries", description = "Search enquiries by keyword (Admin/Staff only)")
    public ResponseEntity<ApiResponse<List<EnquiryDto>>> searchEnquiries(@RequestParam String keyword) {
        List<EnquiryDto> enquiries = enquiryService.searchEnquiries(keyword);
        return ResponseEntity.ok(ApiResponse.success("Enquiries found successfully", enquiries));
    }

    @GetMapping("/status/{status}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
    @Operation(summary = "Get enquiries by status", description = "Get all enquiries with a specific status")
    public ResponseEntity<ApiResponse<List<EnquiryDto>>> getEnquiriesByStatus(@PathVariable String status) {
        List<EnquiryDto> enquiries = enquiryService.getEnquiriesByStatus(status);
        return ResponseEntity.ok(ApiResponse.success("Enquiries retrieved successfully", enquiries));
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
    @Operation(summary = "Update enquiry status", description = "Update the status of an enquiry")
    public ResponseEntity<ApiResponse<EnquiryDto>> updateEnquiryStatus(
            @PathVariable Long id, 
            @RequestParam String status) {
        EnquiryDto updatedEnquiry = enquiryService.updateEnquiryStatus(id, status);
        return ResponseEntity.ok(ApiResponse.success("Enquiry status updated successfully", updatedEnquiry));
    }
}
