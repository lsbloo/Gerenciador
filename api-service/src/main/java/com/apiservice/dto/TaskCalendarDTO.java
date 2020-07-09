package com.apiservice.dto;

import com.apiservice.domain.Tarefa;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class TaskCalendarDTO {
    private Integer id_calendar;
    private List<TarefaResponseDTO> tarefaList;
}
