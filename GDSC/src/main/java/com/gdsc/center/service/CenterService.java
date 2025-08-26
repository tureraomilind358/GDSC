package com.gdsc.center.service;

import com.gdsc.center.dto.CenterDto;
import com.gdsc.center.entity.Center;
import com.gdsc.center.repository.CenterRepository;
import com.gdsc.common.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CenterService {

    @Autowired
    private CenterRepository centerRepository;

    public List<CenterDto> getAllCenters() {
        return centerRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public CenterDto getCenterById(Long id) {
        Center center = centerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Center", "id", id));
        return convertToDto(center);
    }

    public CenterDto createCenter(CenterDto centerDto) {
        Center center = convertToEntity(centerDto);
        Center savedCenter = centerRepository.save(center);
        return convertToDto(savedCenter);
    }

    public CenterDto updateCenter(Long id, CenterDto centerDto) {
        Center existingCenter = centerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Center", "id", id));
        
        // Update fields
        existingCenter.setName(centerDto.getName());
        existingCenter.setCode(centerDto.getCode());
        existingCenter.setAddress(centerDto.getAddress());
        existingCenter.setCity(centerDto.getCity());
        existingCenter.setState(centerDto.getState());
        existingCenter.setPostalCode(centerDto.getZipCode());
        existingCenter.setPhone(centerDto.getPhone());
        existingCenter.setEmail(centerDto.getEmail());
        existingCenter.setCapacity(centerDto.getCapacity());
        existingCenter.setStatus(Center.CenterStatus.valueOf(centerDto.getStatus()));
        existingCenter.setDescription(centerDto.getDescription());
        
        Center updatedCenter = centerRepository.save(existingCenter);
        return convertToDto(updatedCenter);
    }

    public void deleteCenter(Long id) {
        if (!centerRepository.existsById(id)) {
            throw new ResourceNotFoundException("Center", "id", id);
        }
        centerRepository.deleteById(id);
    }

    public List<Object> getCenterStudents(Long centerId) {
        Center center = centerRepository.findById(centerId)
                .orElseThrow(() -> new ResourceNotFoundException("Center", "id", centerId));
        
        return center.getStudents().stream()
                .map(student -> new Object() {
                    public final Long id = student.getId();
                    public final String firstName = student.getFirstName();
                    public final String lastName = student.getLastName();
                    public final String email = student.getEmail();
                    public final String status = student.getStatus().name();
                })
                .collect(Collectors.toList());
    }

    public List<Object> getCenterTeachers(Long centerId) {
        Center center = centerRepository.findById(centerId)
                .orElseThrow(() -> new ResourceNotFoundException("Center", "id", centerId));
        
        return center.getTeachers().stream()
                .map(teacher -> new Object() {
                    public final Long id = teacher.getId();
                    public final String firstName = teacher.getFirstName();
                    public final String lastName = teacher.getLastName();
                    public final String email = teacher.getEmail();
                    public final String expertise = teacher.getExpertise();
                })
                .collect(Collectors.toList());
    }

    public List<Object> getCenterCourses(Long centerId) {
        Center center = centerRepository.findById(centerId)
                .orElseThrow(() -> new ResourceNotFoundException("Center", "id", centerId));
        
        return new java.util.ArrayList<>();
    }

    private CenterDto convertToDto(Center center) {
        CenterDto dto = new CenterDto();
        dto.setId(center.getId());
        dto.setName(center.getName());
        dto.setCode(center.getCode());
        dto.setAddress(center.getAddress());
        dto.setCity(center.getCity());
        dto.setState(center.getState());
        dto.setZipCode(center.getPostalCode());
        dto.setPhone(center.getPhone());
        dto.setEmail(center.getEmail());
        dto.setCapacity(center.getCapacity());
        dto.setStatus(center.getStatus().name());
        dto.setDescription(center.getDescription());
        return dto;
    }

    private Center convertToEntity(CenterDto dto) {
        Center center = new Center();
        center.setName(dto.getName());
        center.setCode(dto.getCode());
        center.setAddress(dto.getAddress());
        center.setCity(dto.getCity());
        center.setState(dto.getState());
        center.setPostalCode(dto.getZipCode());
        center.setPhone(dto.getPhone());
        center.setEmail(dto.getEmail());
        center.setCapacity(dto.getCapacity());
        center.setStatus(Center.CenterStatus.valueOf(dto.getStatus()));
        center.setDescription(dto.getDescription());
        return center;
    }
} 
