package com.gdsc.student.service;

import com.gdsc.common.exception.ResourceNotFoundException;
import com.gdsc.student.dto.StudentDto;
import com.gdsc.student.entity.Student;
import com.gdsc.student.repository.StudentRepository;
import com.gdsc.center.entity.Center;
import com.gdsc.center.repository.CenterRepository;
import com.gdsc.auth.entity.User;
import com.gdsc.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class StudentService {

    private final StudentRepository studentRepository;
    private final CenterRepository centerRepository;
    private final UserRepository userRepository;

    public List<StudentDto> getAllStudents() {
        return studentRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public StudentDto getStudentById(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
        return convertToDto(student);
    }

    public StudentDto createStudent(StudentDto studentDto) {
        Student student = convertToEntity(studentDto);
        Student savedStudent = studentRepository.save(student);
        return convertToDto(savedStudent);
    }

    public StudentDto updateStudent(Long id, StudentDto studentDto) {
        Student existingStudent = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
        
        existingStudent.setFirstName(studentDto.getFirstName());
        existingStudent.setLastName(studentDto.getLastName());
        existingStudent.setDateOfBirth(studentDto.getDateOfBirth());
        existingStudent.setGender(Student.Gender.valueOf(studentDto.getGender()));
        existingStudent.setEmail(studentDto.getEmail());
        existingStudent.setPhone(studentDto.getPhone());
        existingStudent.setAddress(studentDto.getAddress());
        existingStudent.setCity(studentDto.getCity());
        existingStudent.setState(studentDto.getState());
        existingStudent.setPostalCode(studentDto.getZipCode());
        existingStudent.setEnrollmentDate(studentDto.getEnrollmentDate());
        // These fields don't exist in DTO: country, emergencyContact, parentName, parentPhone, graduationDate
        existingStudent.setStatus(Student.StudentStatus.valueOf(studentDto.getStatus()));
        
        // Handle User relationship
        if (studentDto.getUserId() != null) {
            User user = userRepository.findById(studentDto.getUserId())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + studentDto.getUserId()));
            existingStudent.setUser(user);
        }
        
        if (studentDto.getCenterId() != null) {
            Center center = centerRepository.findById(studentDto.getCenterId())
                    .orElseThrow(() -> new ResourceNotFoundException("Center not found with id: " + studentDto.getCenterId()));
            existingStudent.setCenter(center);
        }
        
        Student updatedStudent = studentRepository.save(existingStudent);
        return convertToDto(updatedStudent);
    }

    public void deleteStudent(Long id) {
        if (!studentRepository.existsById(id)) {
            throw new ResourceNotFoundException("Student not found with id: " + id);
        }
        studentRepository.deleteById(id);
    }

    public List<StudentDto> searchStudents(String keyword) {
        return studentRepository.searchStudents(keyword).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<StudentDto> getStudentsByCenter(Long centerId) {
        return studentRepository.findByCenterId(centerId).stream()
                .map(this::convertToDto)
                .collect(java.util.stream.Collectors.toList());
    }

    public List<StudentDto> getStudentsByStatus(String status) {
        return studentRepository.findByStatus(Student.StudentStatus.valueOf(status)).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private StudentDto convertToDto(Student student) {
        StudentDto dto = new StudentDto();
        dto.setId(student.getId());
        dto.setFirstName(student.getFirstName());
        dto.setLastName(student.getLastName());
        dto.setDateOfBirth(student.getDateOfBirth());
        dto.setGender(student.getGender().name());
        dto.setEmail(student.getEmail());
        dto.setPhone(student.getPhone());
        dto.setAddress(student.getAddress());
        dto.setCity(student.getCity());
        dto.setState(student.getState());
        dto.setZipCode(student.getPostalCode());
        dto.setEnrollmentDate(student.getEnrollmentDate());
        // These fields don't exist in DTO: country, emergencyContact, parentName, parentPhone, graduationDate
        dto.setStatus(student.getStatus().name());
        dto.setCenterId(student.getCenter() != null ? student.getCenter().getId() : null);
        dto.setUserId(student.getUser() != null ? student.getUser().getId() : null);
        return dto;
    }

    private Student convertToEntity(StudentDto dto) {
        Student student = new Student();
        student.setFirstName(dto.getFirstName());
        student.setLastName(dto.getLastName());
        student.setDateOfBirth(dto.getDateOfBirth());
        student.setGender(Student.Gender.valueOf(dto.getGender()));
        student.setEmail(dto.getEmail());
        student.setPhone(dto.getPhone());
        student.setAddress(dto.getAddress());
        student.setCity(dto.getCity());
        student.setState(dto.getState());
        student.setPostalCode(dto.getZipCode());
        student.setEnrollmentDate(dto.getEnrollmentDate());
        // These fields don't exist in DTO: country, emergencyContact, parentName, parentPhone, graduationDate
        student.setStatus(Student.StudentStatus.valueOf(dto.getStatus()));
        
        // Handle User relationship
        if (dto.getUserId() != null) {
            User user = userRepository.findById(dto.getUserId())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + dto.getUserId()));
            student.setUser(user);
        }
        
        if (dto.getCenterId() != null) {
            Center center = centerRepository.findById(dto.getCenterId())
                    .orElseThrow(() -> new ResourceNotFoundException("Center not found with id: " + dto.getCenterId()));
            student.setCenter(center);
        }
        
        return student;
    }
}
