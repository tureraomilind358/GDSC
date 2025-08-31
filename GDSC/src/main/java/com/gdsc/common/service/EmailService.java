package com.gdsc.common.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailService.class);

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username:test@gmail.com}")
    private String fromAddress;

    @Value("${app.mail.devMode:false}")
    private boolean devMode;

    public void sendPlainText(String to, String subject, String body) {
        if (devMode) {
            log.info("[DEV MAIL] From: {} To: {} Subject: {}\n{}", fromAddress, to, subject, body);
            return;
        }
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromAddress);
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        try {
            mailSender.send(message);
            log.info("Email sent to {} with subject '{}'", to, subject);
        } catch (MailException ex) {
            log.error("Failed to send email to {}: {}", to, ex.getMessage(), ex);
            throw ex;
        }
    }
}


