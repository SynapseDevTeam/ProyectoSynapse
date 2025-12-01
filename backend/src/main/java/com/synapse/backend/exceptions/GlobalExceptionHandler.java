package com.synapse.backend.exceptions;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.synapse.backend.exceptions.excep.BadPasswordException;
import com.synapse.backend.exceptions.excep.EmailNotFoundException;
import com.synapse.backend.exceptions.excep.EmailYaRegistrado;

@ControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(EmailNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleEmailNotFound(EmailNotFoundException ex) {
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", ex.getMessage()));
    }

    @ExceptionHandler(BadPasswordException.class)
    public ResponseEntity<Map<String, String>> handleBadPassword(BadPasswordException ex) {
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", ex.getMessage()));
    }
    
    @ExceptionHandler(EmailYaRegistrado.class)
    public ResponseEntity<Map<String, String>> EmailYaRegistrado(EmailYaRegistrado ex) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Map.of("error", ex.getMessage()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleOtherExceptions(Exception ex) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Error interno del servidor"));
    }
}
