package com.apiservice.validator.core;

import java.util.LinkedHashSet;
import java.util.Set;

public class Result {

    private Set<String> erros;

    private Set<String> warnings;

    private Set<String> sucess;


    public static Result ok(String sucess) {
        Result results = new Result();
        results.sucess(sucess);
        return results;
    }

    public Result() {
        this.erros = new LinkedHashSet<>();
        this.warnings = new LinkedHashSet<>();
        this.sucess = new LinkedHashSet<>();
    }

    public Result sucess(String sucess) {
        this.sucess.add(sucess);
        return this;
    }

    public Result warning(String warning) {
        this.warnings.add(warning);

        return this;
    }


    public Result error(String error) {
        this.erros.add(error);

        return this;
    }

    public boolean ok(){
        return this.erros == null || this.erros.isEmpty();
    }


    public boolean error(){
        return this.erros != null && !this.erros.isEmpty();
    }

    public Set<String> getErrors() {
        return erros;
    }

    public Set<String> getWarnings() {
        return warnings;
    }

    public Set<String> getSuccess() {
        return sucess;
    }

}
