package com.gdsc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class InstituteManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(InstituteManagementApplication.class, args);
    }
}
