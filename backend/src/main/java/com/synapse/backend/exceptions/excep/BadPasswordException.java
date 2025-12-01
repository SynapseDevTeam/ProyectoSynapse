package com.synapse.backend.exceptions.excep;

public class BadPasswordException extends RuntimeException{
    public BadPasswordException(String msg) { super(msg); }
}
