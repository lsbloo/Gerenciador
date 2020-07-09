package com.apiservice.service;

import com.apiservice.domain.Tarefa;
import com.apiservice.dto.TarefaDTO;
import com.apiservice.dto.TarefaResponseDTO;
import com.apiservice.repository.CalendaryRepository;
import com.apiservice.repository.TarefaRepository;
import com.apiservice.service.interfaces.TarefaServiceInterface;
import com.apiservice.validator.core.Result;
import com.apiservice.validator.core.ValidatorBuilder;
import com.apiservice.validator.validators.TarefaValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TarefaService implements TarefaServiceInterface {

    private final TarefaRepository tarefaRepository;
    private final TarefaValidator tarefaValidator;
    private final CalendaryRepository calendaryREpository;

    @Autowired
    public TarefaService(CalendaryRepository calendaryREpository, TarefaRepository tarefaRepository, TarefaValidator tarefaValidator){
        this.tarefaRepository=tarefaRepository;
        this.tarefaValidator = tarefaValidator;
        this.calendaryREpository=calendaryREpository;
    }

    @Override
    public boolean addTarefa(TarefaDTO tarefaDTO) {
        Result result = new ValidatorBuilder<TarefaDTO>()
                .apply(this.tarefaValidator.checkExistence())
                .validate(tarefaDTO);
        if(result.ok()){
            Tarefa tarefa = new Tarefa();
            tarefa.setDescription(tarefaDTO.getDescription());
            tarefa.setName(tarefaDTO.getName());
            tarefa.setCalendary(this.calendaryREpository.getCalendarById(tarefaDTO.getCalendar_id()));
            this.tarefaRepository.save(tarefa);
            return true;
        }
        return false;
    }

    @Override
    public boolean editTarefa(TarefaDTO tarefaDTO, Integer id_tarefa, boolean conclusion) {
       Result result = new ValidatorBuilder<TarefaDTO>()
               .apply(this.tarefaValidator.checkExistence()).validate(tarefaDTO);
       if(result.ok()){
           Tarefa task = this.tarefaRepository.getTarefaById(id_tarefa);

           Integer re = this.tarefaRepository.updateTarefa(tarefaDTO.getName(),tarefaDTO.getDescription(),conclusion,task.getId());
           return (re != -1) ? true : false;
       }
       return false;
    }

    @Override
    public boolean removeTarefa(Integer id_tarefa) {
        Result result = new ValidatorBuilder<Integer>()
                .apply(this.tarefaValidator.checkExistenceById())
                .validate(id_tarefa);
        if(result.ok()){
            this.tarefaRepository.delete(this.tarefaRepository.getTarefaById(id_tarefa));
            return true;
        }
        return false;
    }

    @Override
    public List<Tarefa> findAllTarefas() {
        return null;
    }

    @Override
    public TarefaResponseDTO getTarefaById(Integer id) {
        Tarefa tarefa = this.tarefaRepository.getTarefaById(id);
        TarefaResponseDTO dto = new TarefaResponseDTO();
        if(tarefa!=null){
            dto.setConclusion(tarefa.isConclusion());
            dto.setDescription(tarefa.getDescription());
            dto.setName(tarefa.getName());
            dto.setId(tarefa.getId());
        }
        return dto;
    }
}
