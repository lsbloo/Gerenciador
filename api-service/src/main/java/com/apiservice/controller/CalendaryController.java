package com.apiservice.controller;


import com.apiservice.domain.Calendary;
import com.apiservice.dto.CalendaryDTO;
import com.apiservice.dto.ResponseDTO;
import com.apiservice.dto.TaskCalendarDTO;
import com.apiservice.service.CalendaryService;
import com.apiservice.util.Calendar;
import com.sun.istack.NotNull;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/calendary")
@Api(value="Agendador", description = "Define as operações de agenda para lista de tarefas", tags= {"Agendador"})
public class CalendaryController {

    public CalendaryService calendaryService;

    @Autowired
    public CalendaryController(CalendaryService calendaryService){
        this.calendaryService=calendaryService;
    }

    @PostMapping(value="", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation(value="Permite a criação de uma agenda.")
    public ResponseEntity<ResponseDTO> createAgendador(@NotNull @RequestBody CalendaryDTO calendaryDTO){
        boolean result = this.calendaryService.addCalendar(calendaryDTO);
        if(result){
            ResponseDTO dto = new ResponseDTO("Calendary Created successul");
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(dto);
        }
        ResponseDTO dto = new ResponseDTO("Calendary Dont  created", "there is a calendar with this month and date");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(dto);
    }

    @DeleteMapping(value="", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation(value="Permite a remoção de uma agenda e o seu conjunto de tarefas.")
    public ResponseEntity<ResponseDTO> deleteAgendador(@RequestParam("id") Integer id){

        boolean result = this.calendaryService.removeCalendar(id);
        if(result){
            ResponseDTO dto = new ResponseDTO("Calendary deleted successful");
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(dto);
        }
        ResponseDTO dto = new ResponseDTO("Calendary dont removed", "No calendary found by id; Check your paremeters");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(dto);
    }


    @GetMapping(value="", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation(value="retorna uma lista de tarefas dado uma agenda especificada")
    public ResponseEntity<TaskCalendarDTO> getTaskByAgenda(@RequestParam("id") Integer id){
        TaskCalendarDTO dto = this.calendaryService.getTaskByCalendar(id);
        if(dto == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        if(dto.getTarefaList().size() != 0){
            return  ResponseEntity.status(HttpStatus.ACCEPTED).body(dto);
        }
        return null;
    }

    @GetMapping(value="/all", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation(value="retorna uma lista de agendas")
    public ResponseEntity<Object> getAllAgenda(){
        List<CalendaryDTO> calendaryList = this.calendaryService.findAllCalendary();
        if(calendaryList==null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(calendaryList);
    }
}
