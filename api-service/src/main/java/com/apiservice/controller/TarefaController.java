package com.apiservice.controller;

import com.apiservice.domain.Tarefa;
import com.apiservice.dto.ResponseDTO;
import com.apiservice.dto.TarefaDTO;
import com.apiservice.dto.TarefaResponseDTO;
import com.apiservice.service.TarefaService;
import com.sun.istack.NotNull;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/task")
@Api(value="Tarefa", description = "Define as operações para criações de tarefas", tags = {"Tarefas"})
public class TarefaController {
    private TarefaService tarefaService;

    @Autowired
    public TarefaController(TarefaService tarefaService){
        this.tarefaService = tarefaService;
    }

    @PostMapping(value="", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation(value="Permite a criação de uma tarefa, dado uma agenda especificada.")
    public ResponseEntity<ResponseDTO> createTarefa(@RequestBody @NotNull TarefaDTO tarefaDTO){

        boolean result = this.tarefaService.addTarefa(tarefaDTO);
        if(result){
            ResponseDTO dto = new ResponseDTO("task created successul");
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(dto);
        }
        ResponseDTO dto = new ResponseDTO("task don't created","Check your paremeters,\n" +
                "\n" +
                "a task with these parameters already exists.");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(dto);
    }

    @DeleteMapping(value="", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation(value="Deleta uma tarefa especificada.")
    public ResponseEntity<ResponseDTO> deleteTarefa(@RequestParam("id") Integer id_tarefa){

        boolean result = this.tarefaService.removeTarefa(id_tarefa);
        if(result){
            ResponseDTO dto = new ResponseDTO("Task deleted successul");
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(dto);
        }
        ResponseDTO dto = new ResponseDTO("Task dont deleted", "a task with id parameter dont exists.");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(dto);
    }

    @PutMapping(value="", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation(value="Permite a edição de uma tarefa especificada")
    public ResponseEntity<ResponseDTO> editTarefa(@RequestBody TarefaDTO tarefaDTO, @RequestParam Integer id_task,@RequestParam boolean conclusion){
        boolean result = this.tarefaService.editTarefa(tarefaDTO,id_task,conclusion);
        if(result){
            ResponseDTO dto = new ResponseDTO("task edit successul");
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(dto);
        }
        ResponseDTO dto = new ResponseDTO("task dont edit", "Check your parameter");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(dto);
    }

    @GetMapping(value="", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation(value="Retorna uma tarefa especificada.")
    public ResponseEntity<Object> getTarefa(@RequestParam("id") Integer id){

        TarefaResponseDTO task = this.tarefaService.getTarefaById(id);
        if(task!=null){
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(task);
        }
        ResponseDTO dto = new ResponseDTO("dont found task by id;");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(dto);
    }

}
