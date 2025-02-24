package com.notesapp.controller;

import com.notesapp.entity.Subject;
import com.notesapp.service.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping({"/api/sharedSubject"})
public class SharedSubjectController {

    @Autowired
    private SubjectService subjectService;

    @GetMapping({"/getSubject/{subId}"})
    public ResponseEntity<Subject> getSubjectDetails(@PathVariable("subId") int subId) {
        Subject subject = subjectService.getSubjectById(subId);
        return ResponseEntity.ok(subject);
    }
}
