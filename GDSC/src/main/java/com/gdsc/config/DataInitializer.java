package com.gdsc.config;

import com.gdsc.auth.entity.Role;
import com.gdsc.auth.entity.User;
import com.gdsc.auth.repository.RoleRepository;
import com.gdsc.auth.repository.UserRepository;
import com.gdsc.course.entity.CourseCategory;
import com.gdsc.course.entity.Course;
import com.gdsc.course.repository.CourseCategoryRepository;
import com.gdsc.course.repository.CourseRepository;
import com.gdsc.student.entity.Student;
import com.gdsc.student.repository.StudentRepository;
import com.gdsc.teacher.entity.Teacher;
import com.gdsc.teacher.repository.TeacherRepository;
import com.gdsc.center.entity.Center;
import com.gdsc.center.repository.CenterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseCategoryRepository courseCategoryRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private CenterRepository centerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        initializeRoles();
        initializeUsers();
        initializeCourseCategories();
        initializeCourses();
        initializeCenters();
        initializeStudents();
        initializeTeachers();
    }

    private void initializeRoles() {
        if (roleRepository.count() == 0) {
            Role adminRole = new Role();
            adminRole.setName(Role.RoleType.ADMIN);
            adminRole.setDescription("Administrator role with full access");
            roleRepository.save(adminRole);

            Role teacherRole = new Role();
            teacherRole.setName(Role.RoleType.TEACHER);
            teacherRole.setDescription("Teacher role for course management");
            roleRepository.save(teacherRole);

            Role studentRole = new Role();
            studentRole.setName(Role.RoleType.STUDENT);
            studentRole.setDescription("Student role for course access");
            roleRepository.save(studentRole);

            Role staffRole = new Role();
            staffRole.setName(Role.RoleType.STAFF);
            staffRole.setDescription("Staff role for administrative tasks");
            roleRepository.save(staffRole);
        }
    }

    private void initializeUsers() {
        if (userRepository.count() == 0) {
            // Admin user
            User adminUser = new User();
            adminUser.setUsername("admin");
            adminUser.setEmail("admin@institute.com");
            adminUser.setPassword(passwordEncoder.encode("admin123"));
            adminUser.setFirstName("Admin");
            adminUser.setLastName("User");
            adminUser.setPhone("9967120080");
            adminUser.setIsEnabled(true);
            
            Role adminRole = roleRepository.findByName(Role.RoleType.ADMIN).orElseThrow();
            adminUser.addRole(adminRole);
            userRepository.save(adminUser);

            // Teacher user
            User teacherUser = new User();
            teacherUser.setUsername("teacher");
            teacherUser.setEmail("teacher@institute.com");
            teacherUser.setPassword(passwordEncoder.encode("teacher123"));
            teacherUser.setFirstName("John");
            teacherUser.setLastName("Doe");
            teacherUser.setPhone("9967120080");
            teacherUser.setIsEnabled(true);
            
            Role teacherRole = roleRepository.findByName(Role.RoleType.TEACHER).orElseThrow();
            teacherUser.addRole(teacherRole);
            userRepository.save(teacherUser);

            // Student user
            User studentUser = new User();
            studentUser.setUsername("student");
            studentUser.setEmail("student@institute.com");
            studentUser.setPassword(passwordEncoder.encode("student123"));
            studentUser.setFirstName("Jane");
            studentUser.setLastName("Smith");
            studentUser.setPhone("9967120080");
            studentUser.setIsEnabled(true);
            
            Role studentRole = roleRepository.findByName(Role.RoleType.STUDENT).orElseThrow();
            studentUser.addRole(studentRole);
            userRepository.save(studentUser);
        }
    }

    private void initializeCourseCategories() {
        if (courseCategoryRepository.count() == 0) {
            CourseCategory itCategory = new CourseCategory();
            itCategory.setName("Information Technology");
            itCategory.setDescription("Courses related to IT and software development");
            itCategory.setIcon("computer");
            itCategory.setColor("#007bff");
            courseCategoryRepository.save(itCategory);

            CourseCategory managementCategory = new CourseCategory();
            managementCategory.setName("Management");
            managementCategory.setDescription("Business and management courses");
            managementCategory.setIcon("business");
            managementCategory.setColor("#28a745");
            courseCategoryRepository.save(managementCategory);

            CourseCategory designCategory = new CourseCategory();
            designCategory.setName("Design");
            designCategory.setDescription("Creative design and multimedia courses");
            designCategory.setIcon("palette");
            designCategory.setColor("#dc3545");
            courseCategoryRepository.save(designCategory);
        }
    }

    private void initializeCourses() {
        if (courseRepository.count() == 0) {
            CourseCategory itCategory = courseCategoryRepository.findByName("Information Technology").orElseThrow();
            CourseCategory managementCategory = courseCategoryRepository.findByName("Management").orElseThrow();
            CourseCategory designCategory = courseCategoryRepository.findByName("Design").orElseThrow();

            // IT Course
            Course javaCourse = new Course();
            javaCourse.setName("Java Programming Fundamentals");
            javaCourse.setDescription("Learn Java programming from basics to advanced concepts");
            javaCourse.setCategory(itCategory);
            javaCourse.setDurationHours(60);
            javaCourse.setFees(new BigDecimal("999.99"));
            javaCourse.setPlatforms("Online, Classroom");
            javaCourse.setIsPublished(true);
            courseRepository.save(javaCourse);

            // Management Course
            Course projectManagement = new Course();
            projectManagement.setName("Project Management Professional");
            projectManagement.setDescription("Master project management methodologies and tools");
            projectManagement.setCategory(managementCategory);
            projectManagement.setDurationHours(80);
            projectManagement.setFees(new BigDecimal("1299.99"));
            projectManagement.setPlatforms("Online, Classroom");
            projectManagement.setIsPublished(true);
            courseRepository.save(projectManagement);

            // Design Course
            Course uiUxDesign = new Course();
            uiUxDesign.setName("UI/UX Design Masterclass");
            uiUxDesign.setDescription("Create beautiful and functional user interfaces");
            uiUxDesign.setCategory(designCategory);
            uiUxDesign.setDurationHours(50);
            uiUxDesign.setFees(new BigDecimal("799.99"));
            uiUxDesign.setPlatforms("Online, Classroom");
            uiUxDesign.setIsPublished(true);
            courseRepository.save(uiUxDesign);
        }
    }

    private void initializeCenters() {
        if (centerRepository.count() == 0) {
            Center mainCenter = new Center();
            mainCenter.setName("Main Campus");
            mainCenter.setCode("MC001");
            mainCenter.setDescription("Main campus with full facilities");
            mainCenter.setAddress("123 Main Street");
            mainCenter.setCity("New York");
            mainCenter.setState("NY");
            mainCenter.setCountry("USA");
            mainCenter.setPhone("9967120080");
            mainCenter.setEmail("main@institute.com");
            mainCenter.setCapacity(500);
            mainCenter.setCurrentEnrollment(0);
            centerRepository.save(mainCenter);

            Center branchCenter = new Center();
            branchCenter.setName("Downtown Branch");
            branchCenter.setCode("DB002");
            branchCenter.setDescription("Downtown location for working professionals");
            branchCenter.setAddress("456 Business Ave");
            branchCenter.setCity("New York");
            branchCenter.setState("NY");
            branchCenter.setCountry("USA");
            branchCenter.setPhone("9967120080");
            branchCenter.setEmail("downtown@institute.com");
            branchCenter.setCapacity(200);
            branchCenter.setCurrentEnrollment(0);
            centerRepository.save(branchCenter);
        }
    }

    private void initializeStudents() {
        if (studentRepository.count() == 0) {
            User studentUser = userRepository.findByUsername("student").orElseThrow();
            Center mainCenter = centerRepository.findByName("Main Campus").orElseThrow();

            Student student = new Student();
            student.setUser(studentUser);
            student.setFirstName("Jane");
            student.setLastName("Smith");
            student.setDateOfBirth(LocalDate.of(2000, 5, 15));
            student.setGender(Student.Gender.FEMALE);
            student.setEmail("jane.smith@email.com");
            student.setPhone("9967120080");
            student.setAddress("789 Student Street");
            student.setCity("New York");
            student.setState("NY");
            student.setCountry("USA");
            student.setEnrollmentDate(LocalDate.now());
            student.setStatus(Student.StudentStatus.ACTIVE);
            studentRepository.save(student);
        }
    }

    private void initializeTeachers() {
        if (teacherRepository.count() == 0) {
            User teacherUser = userRepository.findByUsername("teacher").orElseThrow();
            Center mainCenter = centerRepository.findByName("Main Campus").orElseThrow();

            Teacher teacher = new Teacher();
            teacher.setUser(teacherUser);
            teacher.setFirstName("John");
            teacher.setLastName("Doe");
            teacher.setDateOfBirth(LocalDate.of(1985, 8, 20));
            teacher.setGender(Teacher.Gender.MALE);
            teacher.setEmail("john.doe@institute.com");
            teacher.setPhone("9967120080");
            teacher.setAddress("321 Teacher Lane");
            teacher.setCity("New York");
            teacher.setState("NY");
            teacher.setCountry("USA");
            teacher.setExpertise("Java Programming, Software Architecture");
            teacher.setQualifications("MSc Computer Science, Oracle Certified Professional");
            teacher.setExperience("10+ years in software development and teaching");
            teacher.setYearsOfExperience(10);
            teacher.setHourlyRate(new BigDecimal("75.00"));
            teacher.setJoiningDate(LocalDate.now());
            teacher.setStatus(Teacher.TeacherStatus.ACTIVE);
            teacherRepository.save(teacher);
        }
    }
}
