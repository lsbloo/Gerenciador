package com.apiservice.validator.validators;

import com.apiservice.domain.Tarefa;
import com.apiservice.dto.TarefaDTO;
import com.apiservice.repository.TarefaRepository;
import com.apiservice.validator.core.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TarefaValidator {


    @Autowired
    private TarefaRepository tarefaRepository;

    public Validator<Integer> checkExistenceById(){
        return(result, id) -> {
            Tarefa task = this.tarefaRepository.getTarefaById(id);
            if(task!=null){
                result.ok("ok");
            }else{
                result.error("error");
            }
        };
    }

    public Validator<TarefaDTO> checkExistence(){
        return(result, tarefa) -> {
            Tarefa task = this.tarefaRepository.checkExistenceTarefa(tarefa.getDescription(),tarefa.getName(),tarefa.getCalendar_id());
            if(task!= null){
                result.error("error");
            }else{
                result.ok("ok");
            }
        };
    }
}
