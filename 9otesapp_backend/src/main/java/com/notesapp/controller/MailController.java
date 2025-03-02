package com.notesapp.controller;

import com.notesapp.requests.MailBody;
import com.notesapp.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/mail")
public class MailController {

    @Autowired
    private EmailService emailService;

    @PostMapping({"/sendmail"})
    public ResponseEntity<?> sendEMail(@RequestBody MailBody mailBody) {

        String name = mailBody.getName();
        String email = mailBody.getEmail();
        String msg = mailBody.getMessage();

        String subject = "We've Received Your Message – 9otes Support";
        String msgtoUser = "Hi " + name + ",\n\n"
                + "Thank you for reaching out to us. We have received your message and will respond soon.\n\n"
                + "Here’s a copy of your message:\n"
                + "--------------------------------------\n"
                + "\"" + msg + "\"\n"
                + "--------------------------------------\n\n"
                + "Best Regards,\n9otes Support Team\nsupport@9otes.com";
        emailService.sendEmail(email, subject, msgtoUser);
        return ResponseEntity.ok().build();
    }

}
