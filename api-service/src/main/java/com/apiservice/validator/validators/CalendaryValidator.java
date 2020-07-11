package com.apiservice.validator.validators;

import com.apiservice.domain.Calendary;
import com.apiservice.dto.CalendaryDTO;
import com.apiservice.repository.CalendaryRepository;
import com.apiservice.util.Calendar;
import com.apiservice.validator.core.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CalendaryValidator {

    @Autowired
    private CalendaryRepository calendaryRepository;


    public Validator<Integer> checkExistenceById(){
        return(result, id) ->{
            Calendary calendar = this.calendaryRepository.getCalendarById(id);
            if(calendar!=null){
                result.ok("deleted");
            }else {
                result.error("error");
            }
        };
    }

    public Validator<String> checkExistenceD(){
        return(result,data) -> {
            Calendary calendary1 = this.calendaryRepository.getCalendarByDate(data);
            if(calendary1 != null){

                result.ok("okay");
            }else{
                System.err.println("error");
                result.error("error");
            }
        };
    }
    public Validator<CalendaryDTO> checkExistence(){
      return(result, calendar) -> {
          Calendary calendary1 = this.calendaryRepository.getCalendarByDate(calendar.getDate());
          if(calendary1 != null){
              System.err.println("error");
              result.error("error");
          }else{
              result.ok("okay");
          }
      };
    };
}
