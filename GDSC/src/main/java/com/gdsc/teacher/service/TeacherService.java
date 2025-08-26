package com.gdsc.teacher.service;

import com.gdsc.common.exception.ResourceNotFoundException;
import com.gdsc.teacher.dto.TeacherDto;
import com.gdsc.teacher.entity.Teacher;
import com.gdsc.teacher.repository.TeacherRepository;
import com.gdsc.center.entity.Center;
import com.gdsc.center.repository.CenterRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class TeacherService {

    private final TeacherRepository teacherRepository;
    private final CenterRepository centerRepository;

    public List<TeacherDto> getAllTeachers() {
        return teacherRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public TeacherDto getTeacherById(Long id) {
        Teacher teacher = teacherRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Teacher not found with id: " + id));
        return convertToDto(teacher);
    }

    public TeacherDto createTeacher(TeacherDto teacherDto) {
        Teacher teacher = convertToEntity(teacherDto);
        Teacher savedTeacher = teacherRepository.save(teacher);
        return convertToDto(savedTeacher);
    }

    public TeacherDto updateTeacher(Long id, TeacherDto teacherDto) {
        Teacher existingTeacher = teacherRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Teacher not found with id: " + id));
        
        existingTeacher.setFirstName(teacherDto.getFirstName());
        existingTeacher.setLastName(teacherDto.getLastName());
        existingTeacher.setEmail(teacherDto.getEmail());
        existingTeacher.setPhone(teacherDto.getPhone());
        existingTeacher.setAddress(teacherDto.getAddress());
        existingTeacher.setCity(teacherDto.getCity());
        existingTeacher.setState(teacherDto.getState());
        existingTeacher.setPostalCode(teacherDto.getZipCode());
        // Country field doesn't exist in DTO
        existingTeacher.setDateOfBirth(teacherDto.getDateOfBirth());
        existingTeacher.setGender(Teacher.Gender.valueOf(teacherDto.getGender()));
        existingTeacher.setExpertise(teacherDto.getExpertise());
        existingTeacher.setQualifications(teacherDto.getQualification());
        existingTeacher.setYearsOfExperience(teacherDto.getExperience());
        existingTeacher.setHourlyRate(teacherDto.getSalary());
        existingTeacher.setJoiningDate(teacherDto.getHireDate());
        
        if (teacherDto.getCenterId() != null) {
            Center center = centerRepository.findById(teacherDto.getCenterId())
                    .orElseThrow(() -> new ResourceNotFoundException("Center not found with id: " + teacherDto.getCenterId()));
            existingTeacher.setCenter(center);
        }
        
        Teacher updatedTeacher = teacherRepository.save(existingTeacher);
        return convertToDto(updatedTeacher);
    }

    public void deleteTeacher(Long id) {
        if (!teacherRepository.existsById(id)) {
            throw new ResourceNotFoundException("Teacher not found with id: " + id);
        }
        teacherRepository.deleteById(id);
    }

    public List<TeacherDto> searchTeachers(String keyword) {
        return teacherRepository.searchTeachers(keyword).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<TeacherDto> getTeachersByCenter(Long centerId) {
        return teacherRepository.findByCenterId(centerId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<TeacherDto> getTeachersByExpertise(String expertise) {
        return teacherRepository.findByExpertise(expertise).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<TeacherDto> getTeachersByStatus(String status) {
        return teacherRepository.findByStatus(status).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<TeacherDto> getTeachersByCourse(Long courseId) {
        // TODO: Implement this method when the repository supports it
        return new java.util.ArrayList<>();
    }

    private TeacherDto convertToDto(Teacher teacher) {
        TeacherDto dto = new TeacherDto();
        dto.setId(teacher.getId());
        dto.setFirstName(teacher.getFirstName());
        dto.setLastName(teacher.getLastName());
        dto.setEmail(teacher.getEmail());
        dto.setPhone(teacher.getPhone());
        dto.setAddress(teacher.getAddress());
        dto.setCity(teacher.getCity());
        dto.setState(teacher.getState());
        dto.setZipCode(teacher.getPostalCode());
        // Country field doesn't exist in DTO
        dto.setDateOfBirth(teacher.getDateOfBirth());
        dto.setGender(teacher.getGender().name());
        dto.setExpertise(teacher.getExpertise());
        dto.setQualification(teacher.getQualifications());
        dto.setExperience(teacher.getYearsOfExperience());
        dto.setSalary(teacher.getHourlyRate());
        dto.setHireDate(teacher.getJoiningDate());
        dto.setCenterId(teacher.getCenter() != null ? teacher.getCenter().getId() : null);
        return dto;
    }

    private Teacher convertToEntity(TeacherDto dto) {
        Teacher teacher = new Teacher();
        teacher.setFirstName(dto.getFirstName());
        teacher.setLastName(dto.getLastName());
        teacher.setEmail(dto.getEmail());
        teacher.setPhone(dto.getPhone());
        teacher.setAddress(dto.getAddress());
        teacher.setCity(dto.getCity());
        teacher.setState(dto.getState());
        teacher.setPostalCode(dto.getZipCode());
        // Country field doesn't exist in DTO
        teacher.setDateOfBirth(dto.getDateOfBirth());
        teacher.setGender(Teacher.Gender.valueOf(dto.getGender()));
        teacher.setExpertise(dto.getExpertise());
        teacher.setQualifications(dto.getQualification());
        // Experience field is already Integer, no conversion needed
        teacher.setYearsOfExperience(dto.getExperience());
        teacher.setHourlyRate(dto.getSalary());
        teacher.setJoiningDate(dto.getHireDate());
        
        if (dto.getCenterId() != null) {
            Center center = centerRepository.findById(dto.getCenterId())
                    .orElseThrow(() -> new ResourceNotFoundException("Center not found with id: " + dto.getCenterId()));
            teacher.setCenter(center);
        }
        
        return teacher;
    }
} 
