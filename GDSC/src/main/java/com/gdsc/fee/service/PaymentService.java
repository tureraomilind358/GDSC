package com.gdsc.fee.service;

import com.gdsc.fee.dto.PaymentDto;
import com.gdsc.fee.entity.Payment;
import com.gdsc.fee.repository.PaymentRepository;
import com.gdsc.fee.entity.Fee;
import com.gdsc.fee.repository.FeeRepository;
import com.gdsc.center.entity.Center;
import com.gdsc.center.repository.CenterRepository;
import com.gdsc.common.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;
    
    @Autowired
    private FeeRepository feeRepository;
    
    @Autowired
    private CenterRepository centerRepository;

    public List<PaymentDto> getAllPayments() {
        return paymentRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public PaymentDto getPaymentById(Long id) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Payment", "id", id));
        return convertToDto(payment);
    }

    public PaymentDto createPayment(PaymentDto paymentDto) {
        Payment payment = convertToEntity(paymentDto);
        payment.setPaymentDate(LocalDateTime.now());
        Payment savedPayment = paymentRepository.save(payment);
        return convertToDto(savedPayment);
    }

    public PaymentDto updatePayment(Long id, PaymentDto paymentDto) {
        Payment existingPayment = paymentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Payment", "id", id));
        
        // Update fields
        existingPayment.setAmount(paymentDto.getAmount());
        existingPayment.setPaymentMethod(Payment.PaymentMethod.valueOf(paymentDto.getMethod()));
        existingPayment.setTransactionId(paymentDto.getTransactionId());
        existingPayment.setStatus(Payment.PaymentStatus.valueOf(paymentDto.getStatus()));
        existingPayment.setNotes(paymentDto.getNotes());
        
        // Handle Fee relationship
        if (paymentDto.getFeeId() != null) {
            Fee fee = feeRepository.findById(paymentDto.getFeeId())
                    .orElseThrow(() -> new ResourceNotFoundException("Fee", "id", paymentDto.getFeeId()));
            existingPayment.setFee(fee);
        }
        
        // Handle Center relationship
        if (paymentDto.getCenterId() != null) {
            Center center = centerRepository.findById(paymentDto.getCenterId())
                    .orElseThrow(() -> new ResourceNotFoundException("Center", "id", paymentDto.getCenterId()));
            existingPayment.setCenter(center);
        }
        
        Payment updatedPayment = paymentRepository.save(existingPayment);
        return convertToDto(updatedPayment);
    }

    public void deletePayment(Long id) {
        if (!paymentRepository.existsById(id)) {
            throw new ResourceNotFoundException("Payment", "id", id);
        }
        paymentRepository.deleteById(id);
    }

    public List<PaymentDto> getPaymentsByStudent(Long studentId) {
        return paymentRepository.findByFee_Student_Id(studentId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public PaymentDto processPayment(Long id) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Payment", "id", id));
        
        // Simulate payment processing
        payment.setStatus(Payment.PaymentStatus.SUCCESS);
        payment.setPaymentDate(LocalDateTime.now());
        
        Payment processedPayment = paymentRepository.save(payment);
        return convertToDto(processedPayment);
    }

    public Object generateReceipt(Long paymentId) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new ResourceNotFoundException("Payment", "id", paymentId));
        
        // Return receipt data (in a real app, this would generate a PDF)
        return new Object() {
            public final Long paymentId = payment.getId();
            public final String amount = payment.getAmount().toString();
            public final String method = payment.getPaymentMethod().name();
            public final String transactionId = payment.getTransactionId();
            public final String status = payment.getStatus().name();
            public final String paymentDate = payment.getPaymentDate().toString();
        };
    }

    private PaymentDto convertToDto(Payment payment) {
        PaymentDto dto = new PaymentDto();
        dto.setId(payment.getId());
        dto.setFeeId(payment.getFee().getId());
        dto.setAmount(payment.getAmount());
        dto.setMethod(payment.getPaymentMethod().name());
        dto.setTransactionId(payment.getTransactionId());
        dto.setStatus(payment.getStatus().name());
        dto.setPaymentDate(payment.getPaymentDate());
        dto.setNotes(payment.getNotes());
        if (payment.getCenter() != null) {
            dto.setCenterId(payment.getCenter().getId());
        }
        return dto;
    }

    private Payment convertToEntity(PaymentDto dto) {
        Payment payment = new Payment();
        
        // Handle Fee relationship
        if (dto.getFeeId() != null) {
            Fee fee = feeRepository.findById(dto.getFeeId())
                    .orElseThrow(() -> new ResourceNotFoundException("Fee", "id", dto.getFeeId()));
            payment.setFee(fee);
        }
        
        // Handle Center relationship
        if (dto.getCenterId() != null) {
            Center center = centerRepository.findById(dto.getCenterId())
                    .orElseThrow(() -> new ResourceNotFoundException("Center", "id", dto.getCenterId()));
            payment.setCenter(center);
        }
        
        payment.setAmount(dto.getAmount());
        payment.setPaymentMethod(Payment.PaymentMethod.valueOf(dto.getMethod()));
        payment.setTransactionId(dto.getTransactionId());
        payment.setStatus(Payment.PaymentStatus.valueOf(dto.getStatus()));
        payment.setNotes(dto.getNotes());
        return payment;
    }
} 
