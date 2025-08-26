package com.gdsc.fee.service;

import com.gdsc.fee.dto.FeeDto;
import com.gdsc.fee.entity.Fee;
import com.gdsc.fee.repository.FeeRepository;
import com.gdsc.common.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FeeService {

    @Autowired
    private FeeRepository feeRepository;

    public List<FeeDto> getAllFees() {
        return feeRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public FeeDto getFeeById(Long id) {
        Fee fee = feeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Fee", "id", id));
        return convertToDto(fee);
    }

    public FeeDto createFee(FeeDto feeDto) {
        Fee fee = convertToEntity(feeDto);
        Fee savedFee = feeRepository.save(fee);
        return convertToDto(savedFee);
    }

    public FeeDto updateFee(Long id, FeeDto feeDto) {
        Fee existingFee = feeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Fee", "id", id));
        
        // Update fields - only update what exists in the entity
        existingFee.setTotalAmount(feeDto.getTotalAmount());
        existingFee.setDueDate(feeDto.getDueDate());
        existingFee.setPaidAmount(feeDto.getPaidAmount());
        existingFee.setPendingAmount(feeDto.getPendingAmount());
        
        Fee updatedFee = feeRepository.save(existingFee);
        return convertToDto(updatedFee);
    }

    public void deleteFee(Long id) {
        if (!feeRepository.existsById(id)) {
            throw new ResourceNotFoundException("Fee", "id", id);
        }
        feeRepository.deleteById(id);
    }

    public List<FeeDto> getFeesByStudent(Long studentId) {
        return feeRepository.findByStudent_Id(studentId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<FeeDto> getFeesByCourse(Long courseId) {
        return feeRepository.findByCourseId(courseId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private FeeDto convertToDto(Fee fee) {
        FeeDto dto = new FeeDto();
        dto.setId(fee.getId());
        if (fee.getCourse() != null) {
            dto.setCourseId(fee.getCourse().getId());
        }
        if (fee.getStudent() != null) {
            dto.setStudentId(fee.getStudent().getId());
        }
        dto.setTotalAmount(fee.getTotalAmount());
        dto.setDueDate(fee.getDueDate());
        dto.setPaidAmount(fee.getPaidAmount());
        dto.setPendingAmount(fee.getPendingAmount());
        if (fee.getCenter() != null) {
            dto.setCenterId(fee.getCenter().getId());
        }
        return dto;
    }

    private Fee convertToEntity(FeeDto dto) {
        Fee fee = new Fee();
        fee.setTotalAmount(dto.getTotalAmount());
        fee.setDueDate(dto.getDueDate());
        fee.setPaidAmount(dto.getPaidAmount());
        fee.setPendingAmount(dto.getPendingAmount());
        return fee;
    }
} 
