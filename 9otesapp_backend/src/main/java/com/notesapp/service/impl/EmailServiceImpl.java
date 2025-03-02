package com.notesapp.service.impl;

import com.notesapp.config.DynamicMailSender;
import com.notesapp.service.EmailService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


@Service
@Slf4j
public class EmailServiceImpl implements EmailService {

    private final DynamicMailSender dynamicMailSender;

    @Value("${google.account}")
    private String googleAccount;

    @Value("${google.account.appPassword}")
    private String googleAccountAppPassword;

    public EmailServiceImpl(DynamicMailSender dynamicMailSender) {
        this.dynamicMailSender = dynamicMailSender;
    }

    //verification mailer from the scm app
    @Override
    public void sendEmail(String to, String subject, String body) {

        JavaMailSender mailSender = dynamicMailSender.getMailSender(
                googleAccount, googleAccountAppPassword
        );

        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom(googleAccount);
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }
}
