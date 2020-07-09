package com.apiservice.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;

@NoArgsConstructor
@Getter
@Setter
public class TarefaResponseDTO{
    private Integer id;
    private String name;
    private String description;
    private boolean conclusion;

    public TarefaResponseDTO(Integer id, String name, String description , boolean conclusion){
        this.id=id;
        this.name=name;
        this.description=description;
        this.conclusion=conclusion;
    }
}
