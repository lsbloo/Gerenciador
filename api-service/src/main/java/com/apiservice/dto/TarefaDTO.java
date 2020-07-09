package com.apiservice.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class TarefaDTO {
    private String name;
    private String description;
    private Integer calendar_id;
}
