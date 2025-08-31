package com.gdsc.center.service;

import com.gdsc.auth.entity.Role;
import com.gdsc.auth.entity.User;
import com.gdsc.auth.repository.RoleRepository;
import com.gdsc.auth.repository.UserRepository;
import com.gdsc.center.dto.CenterDto;
import com.gdsc.center.dto.CenterRegistrationRequest;
import com.gdsc.center.dto.CenterRegistrationResponse;
import com.gdsc.center.entity.Center;
import com.gdsc.center.repository.CenterRepository;
import com.gdsc.common.exception.ResourceNotFoundException;
import com.gdsc.common.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class CenterService {

    @Autowired
    private CenterRepository centerRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

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
        centerRepository.findById(centerId)
                .orElseThrow(() -> new ResourceNotFoundException("Center", "id", centerId));
        return new java.util.ArrayList<>();
    }

    public CenterRegistrationResponse registerCenter(CenterRegistrationRequest request) {
        // Validate email uniqueness before creating any records
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists. Please use a different email.");
        }
        Center center = new Center();
        center.setName(request.getName());
        center.setAddress(request.getAddress());
        center.setCity(request.getCity());
        center.setState(request.getState());
        center.setPostalCode(request.getPostalCode());
        center.setCountry(request.getCountry());
        center.setEmail(request.getEmail());
        center.setCapacity(request.getCapacity());
        center.setDescription(request.getDescription());
        String centerCode = generateCenterCode(request.getName());
        center.setCode(centerCode);
        Center savedCenter = centerRepository.save(center);

        String centerUserName = generateUniqueCenterUserName();
        String tempPassword = generateTempPassword();

        User user = new User();
        user.setUsername(centerUserName);
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(tempPassword));
        user.setIsEnabled(true);
        user.setCenter(savedCenter);
        Role centerRole = roleRepository.findByName(Role.RoleType.CENTER).orElseThrow();
        user.addRole(centerRole);
        userRepository.save(user);

        try {
            emailService.sendPlainText(
                request.getEmail(),
                "Center Registration Successful",
                "Dear " + request.getName() + ",\n\n" +
                "Your center has been registered successfully.\n" +
                "Center Code: " + centerCode + "\n" +
                "Center Username: " + centerUserName + "\n" +
                "Temporary Password: " + tempPassword + "\n\n" +
                "Please log in and change your password immediately.\n\n" +
                "You can log in to the system using the following link: on This link http://localhost:4200/auth/change-password\n\n" +
                "Regards,\nGDSC Admin"
            );
        } catch (Exception ex) {
            org.slf4j.LoggerFactory.getLogger(CenterService.class)
                    .warn("Email send failed for center {} ({}): {}", savedCenter.getId(), request.getEmail(), ex.getMessage());
        }

        return CenterRegistrationResponse.builder()
                .centerId(savedCenter.getId())
                .centerCode(centerCode)
                .centerUserName(centerUserName)
                .tempPassword(tempPassword)
                .build();
    }

    private String generateCenterCode(String name) {
        String prefix = name.replaceAll("[^A-Za-z]", "").toUpperCase();
        if (prefix.length() > 5) prefix = prefix.substring(0, 5);
        String date = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy"));
        int rand = 100 + new Random().nextInt(900);
        return prefix + date + rand;
    }

    private String generateCenterUserName() {
        String yearMonth = java.time.LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMM"));
        return "GDSC" + yearMonth;
    }

    private String generateUniqueCenterUserName() {
        String base = generateCenterUserName();
        String candidate = base;
        int counter = 1;
        while (userRepository.existsByUsername(candidate)) {
            candidate = base + String.format("-%03d", counter++);
        }
        return candidate;
    }

    private String generateTempPassword() {
        return Long.toHexString(Double.doubleToLongBits(Math.random())).substring(0, 8) + "@1";
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
