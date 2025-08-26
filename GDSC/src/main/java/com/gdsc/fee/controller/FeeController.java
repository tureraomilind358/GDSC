package com.gdsc.fee.controller;

import com.gdsc.common.ApiResponse;
import com.gdsc.fee.dto.FeeDto;
import com.gdsc.fee.dto.PaymentDto;
import com.gdsc.fee.service.FeeService;
import com.gdsc.fee.service.PaymentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/fees")
@Tag(name = "Fees & Payments", description = "Fee and payment management APIs")
public class FeeController {

    @Autowired
    private FeeService feeService;

    @Autowired
    private PaymentService paymentService;

    // Fee Management Endpoints
    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
    @Operation(summary = "Get all fees", description = "Retrieve all fees (Admin/Staff only)")
    public ResponseEntity<ApiResponse<List<FeeDto>>> getAllFees() {
        List<FeeDto> fees = feeService.getAllFees();
        return ResponseEntity.ok(ApiResponse.success("Fees retrieved successfully", fees));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF') or @feeSecurityService.isOwner(#id)")
    @Operation(summary = "Get fee by ID", description = "Retrieve a specific fee by ID")
    public ResponseEntity<ApiResponse<FeeDto>> getFeeById(@PathVariable Long id) {
        FeeDto fee = feeService.getFeeById(id);
        return ResponseEntity.ok(ApiResponse.success("Fee retrieved successfully", fee));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
    @Operation(summary = "Create new fee", description = "Create a new fee structure (Admin/Staff only)")
    public ResponseEntity<ApiResponse<FeeDto>> createFee(@Valid @RequestBody FeeDto feeDto) {
        FeeDto createdFee = feeService.createFee(feeDto);
        return ResponseEntity.ok(ApiResponse.success("Fee created successfully", createdFee));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
    @Operation(summary = "Update fee", description = "Update an existing fee (Admin/Staff only)")
    public ResponseEntity<ApiResponse<FeeDto>> updateFee(
            @PathVariable Long id, 
            @Valid @RequestBody FeeDto feeDto) {
        FeeDto updatedFee = feeService.updateFee(id, feeDto);
        return ResponseEntity.ok(ApiResponse.success("Fee updated successfully", updatedFee));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete fee", description = "Delete a fee (Admin only)")
    public ResponseEntity<ApiResponse<String>> deleteFee(@PathVariable Long id) {
        feeService.deleteFee(id);
        return ResponseEntity.ok(ApiResponse.success("Fee deleted successfully"));
    }

    @GetMapping("/student/{studentId}")
    @Operation(summary = "Get student fees", description = "Get all fees for a specific student")
    public ResponseEntity<ApiResponse<List<FeeDto>>> getStudentFees(@PathVariable Long studentId) {
        List<FeeDto> fees = feeService.getFeesByStudent(studentId);
        return ResponseEntity.ok(ApiResponse.success("Student fees retrieved successfully", fees));
    }

    @GetMapping("/course/{courseId}")
    @Operation(summary = "Get course fees", description = "Get fee structure for a specific course")
    public ResponseEntity<ApiResponse<List<FeeDto>>> getCourseFees(@PathVariable Long courseId) {
        List<FeeDto> fees = feeService.getFeesByCourse(courseId);
        return ResponseEntity.ok(ApiResponse.success("Course fees retrieved successfully", fees));
    }

    // Payment Management Endpoints
    @GetMapping("/payments")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
    @Operation(summary = "Get all payments", description = "Retrieve all payments (Admin/Staff only)")
    public ResponseEntity<ApiResponse<List<PaymentDto>>> getAllPayments() {
        List<PaymentDto> payments = paymentService.getAllPayments();
        return ResponseEntity.ok(ApiResponse.success("Payments retrieved successfully", payments));
    }

    @GetMapping("/payments/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF') or @paymentSecurityService.isOwner(#id)")
    @Operation(summary = "Get payment by ID", description = "Retrieve a specific payment by ID")
    public ResponseEntity<ApiResponse<PaymentDto>> getPaymentById(@PathVariable Long id) {
        PaymentDto payment = paymentService.getPaymentById(id);
        return ResponseEntity.ok(ApiResponse.success("Payment retrieved successfully", payment));
    }

    @PostMapping("/payments")
    @Operation(summary = "Create new payment", description = "Create a new payment record")
    public ResponseEntity<ApiResponse<PaymentDto>> createPayment(@Valid @RequestBody PaymentDto paymentDto) {
        PaymentDto createdPayment = paymentService.createPayment(paymentDto);
        return ResponseEntity.ok(ApiResponse.success("Payment created successfully", createdPayment));
    }

    @PutMapping("/payments/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
    @Operation(summary = "Update payment", description = "Update an existing payment (Admin/Staff only)")
    public ResponseEntity<ApiResponse<PaymentDto>> updatePayment(
            @PathVariable Long id, 
            @Valid @RequestBody PaymentDto paymentDto) {
        PaymentDto updatedPayment = paymentService.updatePayment(id, paymentDto);
        return ResponseEntity.ok(ApiResponse.success("Payment updated successfully", updatedPayment));
    }

//    @GetMapping("/payments/student/{studentId}")
//    @Operation(summary = "Get student payments", description = "Get all payments for a specific student")
//    public ResponseEntity<ApiResponse<List<PaymentDto>>> getStudentPayments(@PathVariable Long studentId) {
//        List<PaymentDto> payments = paymentService.getPaymentsByStudent(studentId);
//        return ResponseEntity.ok(ApiResponse.success("Student payments retrieved successfully", payments));
//    }

    @PostMapping("/payments/{id}/process")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
    @Operation(summary = "Process payment", description = "Process a payment (Admin/Staff only)")
    public ResponseEntity<ApiResponse<PaymentDto>> processPayment(@PathVariable Long id) {
        PaymentDto processedPayment = paymentService.processPayment(id);
        return ResponseEntity.ok(ApiResponse.success("Payment processed successfully", processedPayment));
    }

    @GetMapping("/receipt/{paymentId}")
    @Operation(summary = "Generate receipt", description = "Generate payment receipt")
    public ResponseEntity<ApiResponse<Object>> generateReceipt(@PathVariable Long paymentId) {
        Object receipt = paymentService.generateReceipt(paymentId);
        return ResponseEntity.ok(ApiResponse.success("Receipt generated successfully", receipt));
    }
}
