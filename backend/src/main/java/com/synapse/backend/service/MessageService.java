package com.synapse.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;

import java.util.Locale;

@Service
public class MessageService {

    @Autowired
    private MessageSource messageSource;

    @SuppressWarnings("deprecation")
    public String getMessage(String code, String lang) {
        Locale locale;

        if (lang == null) {
            locale = new Locale("es");
        } else {
            locale = new Locale(lang);
        }

        return messageSource.getMessage(code, null, locale);
    }
}
