package com.apiservice.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CalendaryDTO {



    private String description;

    private String date;


    public CalendaryDTO(String description, String date){
        this.description=description;
        this.date= date;
    }
}
