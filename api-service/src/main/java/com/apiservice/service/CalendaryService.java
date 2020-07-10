package com.apiservice.service;

import com.apiservice.domain.Calendary;
import com.apiservice.domain.Tarefa;
import com.apiservice.dto.CalendaryDTO;
import com.apiservice.dto.CalendaryListDTO;
import com.apiservice.dto.TarefaResponseDTO;
import com.apiservice.dto.TaskCalendarDTO;
import com.apiservice.repository.CalendaryRepository;
import com.apiservice.repository.TarefaRepository;
import com.apiservice.service.interfaces.CalendaryServiceInterface;
import com.apiservice.validator.core.Result;
import com.apiservice.validator.core.ValidatorBuilder;
import com.apiservice.validator.validators.CalendaryValidator;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CalendaryService implements CalendaryServiceInterface {


    private final CalendaryValidator calendaryValidator;
    private final CalendaryRepository calendaryRepository;
    private final TarefaRepository tarefaRepository;

    @Autowired
    public CalendaryService(TarefaRepository tarefaRepository,CalendaryRepository calendaryRepository, CalendaryValidator calendaryValidator){
        this.calendaryRepository=calendaryRepository;
        this.calendaryValidator= calendaryValidator;
        this.tarefaRepository=tarefaRepository;
    }


    @Override
    public boolean addCalendar(CalendaryDTO calendaryDTO){
        Result result = new ValidatorBuilder<CalendaryDTO>()
                .apply(this.calendaryValidator.checkExistence()).validate(calendaryDTO);
        if(result.ok()){
            Calendary calendary = new Calendary();
            calendary.setDate(calendaryDTO.getDate());
            calendary.setDescription(calendaryDTO.getDescription());
            this.calendaryRepository.save(calendary);
            return true;
        }
        return false;
    }

    @Override
    public boolean removeCalendar(Integer id_calendar) {
        Result result = new ValidatorBuilder<Integer>()
                .apply(this.calendaryValidator.checkExistenceById())
                .validate(id_calendar);

        if(result.ok()){
            List<Tarefa> tarefaList = this.tarefaRepository.getTarefasByCalendarId(id_calendar);
            tarefaList.forEach(item -> this.tarefaRepository.delete(item));
            this.calendaryRepository.delete(this.calendaryRepository.getCalendarById(id_calendar));
            return true;
        }
        return false;
    }

    @Override
    public TaskCalendarDTO getTaskByCalendar(Integer id_calendar) {
        List<Tarefa> tarefaList = this.tarefaRepository.getTarefasByCalendarId(id_calendar);
        if(tarefaList.size() == 0) return null;
        List<TarefaResponseDTO> tarefaResponseDTOS = new ArrayList<>();
        tarefaList.forEach(item -> tarefaResponseDTOS.add(new TarefaResponseDTO(
                item.getId(),item.getName(),item.getDescription(),item.isConclusion()
        )));
        TaskCalendarDTO dto = new TaskCalendarDTO();
        dto.setId_calendar(id_calendar);
        dto.setTarefaList(tarefaResponseDTOS);
        return dto;
    }

    @Override
    public List<CalendaryListDTO> findAllCalendary() {
       List<Calendary> calendaryList = this.calendaryRepository.findAllCalendaryList();
       if(calendaryList.size()==0) return null;
       List<CalendaryListDTO> dtoList = new ArrayList<>();
       calendaryList.forEach(item -> dtoList.add(
               new CalendaryListDTO(item.getId(),item.getDescription(),item.getDate())
       ));
       return dtoList;
    }
}
