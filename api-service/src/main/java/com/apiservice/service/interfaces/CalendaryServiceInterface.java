package com.apiservice.service.interfaces;


import com.apiservice.domain.Calendary;
import com.apiservice.dto.CalendaryDTO;
import com.apiservice.dto.CalendaryListDTO;
import com.apiservice.dto.TaskCalendarDTO;

import java.util.List;

public interface CalendaryServiceInterface {


    /**
     * Permite a criação de uma agenda para uma lista de tarefas.
     * um calendario pode ter um ou mais listas de tarefas.
     * @param calendaryDTO
     * @return
     */
    boolean addCalendar(CalendaryDTO calendaryDTO);

    /**
     * Permite a remoção de uma agenda, ao remover todas as tarefas concluidas ou não, são removidas também.
     * @param id_calendar
     * @return
     */
    boolean removeCalendar(Integer id_calendar);


    /**
     * Retorna uma lista de tarefas dado um id para uma agenda especificada.
     * @param id_calendar
     * @return
     */
    TaskCalendarDTO getTaskByCalendar(Integer id_calendar);

    /**
     * retorna uma lista de agendas;
     * @return
     */
    List<CalendaryListDTO> findAllCalendary();
}
