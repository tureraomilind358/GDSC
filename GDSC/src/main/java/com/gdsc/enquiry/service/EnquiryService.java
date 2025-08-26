package com.gdsc.enquiry.service;

import com.gdsc.enquiry.dto.EnquiryDto;
import com.gdsc.enquiry.entity.Enquiry;
import com.gdsc.enquiry.repository.EnquiryRepository;
import com.gdsc.common.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EnquiryService {

    @Autowired
    private EnquiryRepository enquiryRepository;

    public List<EnquiryDto> getAllEnquiries() {
        return enquiryRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public EnquiryDto getEnquiryById(Long id) {
        Enquiry enquiry = enquiryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Enquiry", "id", id));
        return convertToDto(enquiry);
    }

    public EnquiryDto createEnquiry(EnquiryDto enquiryDto) {
        Enquiry enquiry = convertToEntity(enquiryDto);
        Enquiry savedEnquiry = enquiryRepository.save(enquiry);
        return convertToDto(savedEnquiry);
    }

    public EnquiryDto updateEnquiry(Long id, EnquiryDto enquiryDto) {
        Enquiry existingEnquiry = enquiryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Enquiry", "id", id));
        
        // Update fields
        existingEnquiry.setName(enquiryDto.getFirstName() + " " + enquiryDto.getLastName());
        existingEnquiry.setEmail(enquiryDto.getEmail());
        existingEnquiry.setPhone(enquiryDto.getPhone());
        existingEnquiry.setSource(Enquiry.EnquirySource.valueOf(enquiryDto.getSource()));
        existingEnquiry.setMessage(enquiryDto.getMessage());
        existingEnquiry.setStatus(Enquiry.EnquiryStatus.valueOf(enquiryDto.getStatus()));
        existingEnquiry.setFollowUpDate(enquiryDto.getFollowUpDate() != null ? java.time.LocalDateTime.parse(enquiryDto.getFollowUpDate()) : null);
        existingEnquiry.setNotes(enquiryDto.getFollowUpNotes());
        
        Enquiry updatedEnquiry = enquiryRepository.save(existingEnquiry);
        return convertToDto(updatedEnquiry);
    }

    public void deleteEnquiry(Long id) {
        if (!enquiryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Enquiry", "id", id);
        }
        enquiryRepository.deleteById(id);
    }

    public List<EnquiryDto> searchEnquiries(String keyword) {
        return enquiryRepository.searchEnquiries(keyword).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<EnquiryDto> getEnquiriesByStatus(String status) {
        return enquiryRepository.findByStatus(status).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public EnquiryDto updateEnquiryStatus(Long id, String status) {
        Enquiry enquiry = enquiryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Enquiry", "id", id));
        
        enquiry.setStatus(Enquiry.EnquiryStatus.valueOf(status));
        Enquiry updatedEnquiry = enquiryRepository.save(enquiry);
        return convertToDto(updatedEnquiry);
    }

    private EnquiryDto convertToDto(Enquiry enquiry) {
        EnquiryDto dto = new EnquiryDto();
        dto.setId(enquiry.getId());
        String[] nameParts = enquiry.getName().split(" ", 2);
        dto.setFirstName(nameParts.length > 0 ? nameParts[0] : "");
        dto.setLastName(nameParts.length > 1 ? nameParts[1] : "");
        dto.setEmail(enquiry.getEmail());
        dto.setPhone(enquiry.getPhone());
        if (enquiry.getInterestedCourse() != null) {
            dto.setInterestedCourseId(enquiry.getInterestedCourse().getId());
        }
        dto.setSource(enquiry.getSource().name());
        dto.setMessage(enquiry.getMessage());
        dto.setStatus(enquiry.getStatus().name());
        dto.setFollowUpDate(enquiry.getFollowUpDate() != null ? enquiry.getFollowUpDate().toString() : null);
        dto.setFollowUpNotes(enquiry.getNotes());
        if (enquiry.getCenter() != null) {
            dto.setCenterId(enquiry.getCenter().getId());
        }
        return dto;
    }

    private Enquiry convertToEntity(EnquiryDto dto) {
        Enquiry enquiry = new Enquiry();
        enquiry.setName(dto.getFirstName() + " " + dto.getLastName());
        enquiry.setEmail(dto.getEmail());
        enquiry.setPhone(dto.getPhone());
        enquiry.setSource(Enquiry.EnquirySource.valueOf(dto.getSource()));
        enquiry.setMessage(dto.getMessage());
        enquiry.setStatus(Enquiry.EnquiryStatus.valueOf(dto.getStatus()));
        enquiry.setFollowUpDate(dto.getFollowUpDate() != null ? java.time.LocalDateTime.parse(dto.getFollowUpDate()) : null);
        enquiry.setNotes(dto.getFollowUpNotes());
        return enquiry;
    }
} 
