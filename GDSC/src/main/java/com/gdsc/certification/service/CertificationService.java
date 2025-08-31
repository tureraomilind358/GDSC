package com.gdsc.certification.service;

import com.gdsc.certification.dto.CertificationDto;
import com.gdsc.certification.entity.Certification;
import com.gdsc.certification.repository.CertificationRepository;
import com.gdsc.common.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CertificationService {

    @Autowired
    private CertificationRepository certificationRepository;

    public List<CertificationDto> getAllCertifications() {
        return certificationRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public CertificationDto getCertificationById(Long id) {
        Certification certification = certificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Certification", "id", id));
        return convertToDto(certification);
    }

    public CertificationDto createCertification(CertificationDto certificationDto) {
        Certification certification = convertToEntity(certificationDto);
        Certification savedCertification = certificationRepository.save(certification);
        return convertToDto(savedCertification);
    }

    public CertificationDto updateCertification(Long id, CertificationDto certificationDto) {
        Certification existingCertification = certificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Certification", "id", id));
        
        // Update fields
        existingCertification.setIssueDate(certificationDto.getIssueDate());
        existingCertification.setExpiryDate(certificationDto.getExpiryDate());
        existingCertification.setStatus(Certification.CertificationStatus.valueOf(certificationDto.getStatus()));
        
        Certification updatedCertification = certificationRepository.save(existingCertification);
        return convertToDto(updatedCertification);
    }

    public void deleteCertification(Long id) {
        if (!certificationRepository.existsById(id)) {
            throw new ResourceNotFoundException("Certification", "id", id);
        }
        certificationRepository.deleteById(id);
    }

    public List<CertificationDto> getCertificationsByStudent(Long studentId) {
        return certificationRepository.findByStudent_Id(studentId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<CertificationDto> getCertificationsByCourse(Long courseId) {
        return certificationRepository.findByCourseId(courseId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public Object generateCertificate(Long id) {
        Certification certification = certificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Certification", "id", id));
        
        // Generate unique certificate ID
        String certificateId = "CERT" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        certification.setVerificationCode(certificateId);
        certification.setStatus(Certification.CertificationStatus.ACTIVE);
        
        Certification updatedCertification = certificationRepository.save(certification);
        
        // Return certificate data (in a real app, this would generate a PDF)
        return new Object() {
            public final Long id = updatedCertification.getId();
            public final String certificateId = updatedCertification.getVerificationCode();
            public final String status = updatedCertification.getStatus().name();
            public final String issueDate = updatedCertification.getIssueDate().toString();
        };
    }

    public Object downloadCertificate(Long id) {
        Certification certification = certificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Certification", "id", id));
        
        // Return certificate data for download (in a real app, this would return a PDF file)
        return new Object() {
            public final Long id = certification.getId();
            public final String certificateId = certification.getVerificationCode();
            public final String status = certification.getStatus().name();
            public final String issueDate = certification.getIssueDate().toString();
        };
    }

    public Object verifyCertificate(String certificateId, String studentName, String courseName) {
        Certification certification = certificationRepository.findByVerificationCode(certificateId)
                .orElseThrow(() -> new ResourceNotFoundException("Certification", "verification code", certificateId));
        
        // Return verification result
        return new Object() {
            public final boolean isValid = true;
            public final String certificateId = certification.getVerificationCode();
            public final String status = certification.getStatus().name();
            public final String issueDate = certification.getIssueDate().toString();
            public final String expiryDate = certification.getExpiryDate() != null ? certification.getExpiryDate().toString() : "No expiry";
        };
    }

    public String getCertificateStatus(Long id) {
        Certification certification = certificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Certification", "id", id));
        return certification.getStatus().name();
    }

    public List<CertificationDto> getCertificationsByCenter(Long centerId) {
        return certificationRepository.findByCenterId(centerId).stream()
                .map(this::convertToDto)
                .collect(java.util.stream.Collectors.toList());
    }

    public void revokeCertificate(Long id) {
        Certification certification = certificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Certification", "id", id));
        
        certification.setStatus(Certification.CertificationStatus.REVOKED);
        certificationRepository.save(certification);
    }

    private CertificationDto convertToDto(Certification certification) {
        CertificationDto dto = new CertificationDto();
        dto.setId(certification.getId());
        dto.setStudentId(certification.getStudent().getId());
        dto.setCourseId(certification.getCourse().getId());
        dto.setIssueDate(certification.getIssueDate());
        dto.setExpiryDate(certification.getExpiryDate());
        // Grade field doesn't exist in the entity
        dto.setCertificateUrl(certification.getCertificateUrl());
        dto.setVerificationCode(certification.getVerificationCode());
        dto.setStatus(certification.getStatus().name());
        if (certification.getCenter() != null) {
            dto.setCenterId(certification.getCenter().getId());
        }
        return dto;
    }

    private Certification convertToEntity(CertificationDto dto) {
        Certification certification = new Certification();
        certification.setIssueDate(dto.getIssueDate());
        certification.setExpiryDate(dto.getExpiryDate());
        certification.setStatus(Certification.CertificationStatus.valueOf(dto.getStatus()));
        return certification;
    }
} 
