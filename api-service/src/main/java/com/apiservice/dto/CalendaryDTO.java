package com.apiservice.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CalendaryDTO {

    private String month;

    private String description;

    private String date;

    public CalendaryDTO(String month, String description, String date){
        this.month=month;
        this.description=description;
        this.date= date;
    }
}
