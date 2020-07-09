package com.apiservice.service.interfaces;

import com.apiservice.domain.Tarefa;
import com.apiservice.dto.TarefaDTO;
import com.apiservice.dto.TarefaResponseDTO;

import java.util.List;

public interface TarefaServiceInterface {


    /**
     * Permite a criação de uma tarefa.
     * @param tarefaDTO
     * @return
     */
    boolean addTarefa(TarefaDTO tarefaDTO);

    /**
     * Edição de tarefas
     * @param tarefaDTO
     * @param id_tarefa
     * @return
     */
    boolean editTarefa(TarefaDTO tarefaDTO, Integer id_tarefa, boolean conclusion);

    /**
     * Remoção de tarefas.
     * @param id_tarefa
     * @return
     */
    boolean removeTarefa(Integer id_tarefa);

    /**
     * Retorna uma lista de tarefas.
     * @return
     */
    List<Tarefa> findAllTarefas();

    /**
     * retorna uma tarefa especificada.
     * @param id
     * @return
     */
    TarefaResponseDTO getTarefaById(Integer id);
}
