package com.apiservice.dto;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class ResponseDTO {
    private String description;
    private String message;


    public ResponseDTO(String message){
        this.message=message;
    }
    public ResponseDTO(String message, String description){
        this.message=message;
        this.description=description;
    }
}
