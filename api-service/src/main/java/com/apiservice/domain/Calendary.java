package com.apiservice.domain;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;


/**
 * Define o dominio de agenda de tarefas.
 *  -> um 'calendary' pode ter uma ou mais tarefas.
 */
@NoArgsConstructor
@Getter
@Setter
@Entity(name="calendary")
public class Calendary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String date;

    private String month;

    private String description;


    @OneToMany
    private List<Tarefa> tarefaList;
}
