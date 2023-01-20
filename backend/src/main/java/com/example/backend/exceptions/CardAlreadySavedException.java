package com.example.backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class CardAlreadySavedException extends RuntimeException {
    public CardAlreadySavedException(String message){
        super(message);
    }
}
