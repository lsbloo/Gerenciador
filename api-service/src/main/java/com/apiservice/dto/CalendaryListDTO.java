package com.apiservice.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CalendaryListDTO {

    private String description;

    private String date;
    private Integer id;

    public CalendaryListDTO(Integer id ,String description, String date){
        this.description=description;
        this.date= date;
        this.id=id;
    }
}
