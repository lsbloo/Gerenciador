package com.apiservice.repository;

import com.apiservice.domain.Tarefa;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface TarefaRepository extends CrudRepository<Tarefa,Integer> {


    @Query(value="select * from tarefa where description=:description and name=:name and calendary_id=:id_calendary",nativeQuery=true)
    Tarefa checkExistenceTarefa(@Param("description") String description, @Param("name") String name, @Param("id_calendary") Integer id_calendary);

    @Query(value="select * from tarefa where id=:id", nativeQuery=true)
    Tarefa getTarefaById(@Param("id") Integer id);

    @Query(value="select * from tarefa where calendary_id=:id", nativeQuery=true)
    List<Tarefa> getTarefasByCalendarId(@Param("id") Integer calendary_id);

    @Modifying
    @Transactional
    @Query(value="update tarefa set name=:name, description=:description, conclusion=:conclusion where id=:id")
    Integer updateTarefa(@Param("name") String name, @Param("description") String description,
                         @Param("conclusion") boolean conclusion, @Param("id") Integer id);


}
