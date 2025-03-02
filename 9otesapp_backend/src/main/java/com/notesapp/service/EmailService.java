package com.notesapp.service;

public interface EmailService {
    //email to single person
    void sendEmail(String to, String subject, String body);

}