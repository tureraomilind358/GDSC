package com.gdsc.certification.controller;

import com.gdsc.common.ApiResponse;
import com.gdsc.certification.dto.CertificationDto;
import com.gdsc.certification.service.CertificationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/certifications")
@Tag(name = "Certifications", description = "Certification management APIs")
public class CertificationController {

    @Autowired
    private CertificationService certificationService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
    @Operation(summary = "Get all certifications", description = "Retrieve all certifications (Admin/Staff only)")
    public ResponseEntity<ApiResponse<List<CertificationDto>>> getAllCertifications() {
        List<CertificationDto> certifications = certificationService.getAllCertifications();
        return ResponseEntity.ok(ApiResponse.success("Certifications retrieved successfully", certifications));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get certification by ID", description = "Retrieve a specific certification by ID")
    public ResponseEntity<ApiResponse<CertificationDto>> getCertificationById(@PathVariable Long id) {
        CertificationDto certification = certificationService.getCertificationById(id);
        return ResponseEntity.ok(ApiResponse.success("Certification retrieved successfully", certification));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
    @Operation(summary = "Create new certification", description = "Create a new certification (Admin/Staff only)")
    public ResponseEntity<ApiResponse<CertificationDto>> createCertification(@Valid @RequestBody CertificationDto certificationDto) {
        CertificationDto createdCertification = certificationService.createCertification(certificationDto);
        return ResponseEntity.ok(ApiResponse.success("Certification created successfully", createdCertification));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
    @Operation(summary = "Update certification", description = "Update an existing certification (Admin/Staff only)")
    public ResponseEntity<ApiResponse<CertificationDto>> updateCertification(
            @PathVariable Long id, 
            @Valid @RequestBody CertificationDto certificationDto) {
        CertificationDto updatedCertification = certificationService.updateCertification(id, certificationDto);
        return ResponseEntity.ok(ApiResponse.success("Certification updated successfully", updatedCertification));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete certification", description = "Delete a certification (Admin only)")
    public ResponseEntity<ApiResponse<String>> deleteCertification(@PathVariable Long id) {
        certificationService.deleteCertification(id);
        return ResponseEntity.ok(ApiResponse.success("Certification deleted successfully"));
    }

    @GetMapping("/student/{studentId}")
    @Operation(summary = "Get student certifications", description = "Get all certifications for a student")
    public ResponseEntity<ApiResponse<List<CertificationDto>>> getStudentCertifications(@PathVariable Long studentId) {
        List<CertificationDto> certifications = certificationService.getCertificationsByStudent(studentId);
        return ResponseEntity.ok(ApiResponse.success("Student certifications retrieved successfully", certifications));
    }

    @GetMapping("/course/{courseId}")
    @Operation(summary = "Get course certifications", description = "Get all certifications for a course")
    public ResponseEntity<ApiResponse<List<CertificationDto>>> getCourseCertifications(@PathVariable Long courseId) {
        List<CertificationDto> certifications = certificationService.getCertificationsByCourse(courseId);
        return ResponseEntity.ok(ApiResponse.success("Course certifications retrieved successfully", certifications));
    }

    @PostMapping("/{id}/generate")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
    @Operation(summary = "Generate certificate", description = "Generate digital certificate (Admin/Staff only)")
    public ResponseEntity<ApiResponse<Object>> generateCertificate(@PathVariable Long id) {
        Object certificate = certificationService.generateCertificate(id);
        return ResponseEntity.ok(ApiResponse.success("Certificate generated successfully", certificate));
    }

    @GetMapping("/{id}/download")
    @Operation(summary = "Download certificate", description = "Download certificate as PDF")
    public ResponseEntity<Object> downloadCertificate(@PathVariable Long id) {
        Object certificate = certificationService.downloadCertificate(id);
        return ResponseEntity.ok(certificate);
    }

    // Public Verification Endpoint (No Authentication Required)
    @GetMapping("/verify/{certificateId}")
    @Operation(summary = "Verify certificate", description = "Public endpoint to verify certificate authenticity")
    public ResponseEntity<ApiResponse<Object>> verifyCertificate(
            @PathVariable String certificateId,
            @RequestParam(required = false) String studentName,
            @RequestParam(required = false) String courseName) {
        Object verificationResult = certificationService.verifyCertificate(certificateId, studentName, courseName);
        return ResponseEntity.ok(ApiResponse.success("Certificate verification completed", verificationResult));
    }

    @GetMapping("/{id}/status")
    @Operation(summary = "Get certificate status", description = "Get the current status of a certificate")
    public ResponseEntity<ApiResponse<String>> getCertificateStatus(@PathVariable Long id) {
        String status = certificationService.getCertificateStatus(id);
        return ResponseEntity.ok(ApiResponse.success("Certificate status retrieved successfully", status));
    }

    @PutMapping("/{id}/revoke")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Revoke certificate", description = "Revoke a certificate (Admin only)")
    public ResponseEntity<ApiResponse<String>> revokeCertificate(@PathVariable Long id) {
        certificationService.revokeCertificate(id);
        return ResponseEntity.ok(ApiResponse.success("Certificate revoked successfully"));
    }
}
