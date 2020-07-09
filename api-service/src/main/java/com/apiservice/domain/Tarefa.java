package com.apiservice.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity(name="tarefa")
public class Tarefa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="name", length = 100)
    private String name;

    @Column(name="description", length = 255)
    private String description;

    @Column(name = "conclusion")
    private boolean conclusion;


    public Tarefa(String name, String description){
        setName(name);
        setDescription(description);
    }


    @ManyToOne
    private Calendary calendary;
}
