package com.apiservice.repository;

import com.apiservice.domain.Calendary;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CalendaryRepository extends CrudRepository<Calendary, Integer> {

    @Query(value = "select * from calendary",nativeQuery = true)
    List<Calendary> findAllCalendaryList();

    @Query(value="select * from calendary where date=:date", nativeQuery = true)
    Calendary getCalendarByDate(@Param("date") String date);

    @Query(value="select * from calendary where id=:id", nativeQuery=true)
    Calendary getCalendarById(@Param("id") Integer id);


}
