package com.gdsc.center.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CenterRegistrationResponse {
    private Long centerId;
    private String centerCode;
    private String centerUserName;
    private String tempPassword;
}


