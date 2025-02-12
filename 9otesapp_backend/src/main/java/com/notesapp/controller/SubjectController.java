package com.notesapp.controller;

import com.notesapp.entity.Subject;
import com.notesapp.entity.User;
import com.notesapp.repository.SubjectRepo;
import com.notesapp.repository.UserRepo;
import com.notesapp.service.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping({"/api/{userId}"})
public class SubjectController {

    @Autowired
    private SubjectRepo subjectRepo;

    @Autowired
    private SubjectService subjectService;
    @Autowired
    private UserRepo userRepo;

    @GetMapping({"/getallsubjects"})
    public List<Subject> getSubjects(@PathVariable("userId") int userId) {
        User user = userRepo.findById(userId);
        return subjectService.getSubjectsByUser(user);
    }

    @PostMapping({"/addsubject"})
    public ResponseEntity<Subject> addSubject(@PathVariable("userId") int userId, @RequestBody Subject subject) {
        return ResponseEntity.ok(subjectService.addSubject(userId, subject));
    }

    @DeleteMapping("/deletesub/{subid}")
    public ResponseEntity<?> deleteSubject(@PathVariable("subid") int subid) {
        Subject subject = subjectRepo.findById(subid);

        subjectRepo.deleteById(subid);

        return ResponseEntity.ok(subject);  // Return the deleted subject
    }

    @PutMapping({"/updatesub/{subid}"})
    public ResponseEntity<?> updateSubject(@PathVariable("subid") int subid, @RequestParam("subname") String updatedsubname ) {
        Subject subject = subjectRepo.findById(subid);
        subject.setSubname(updatedsubname);
        subjectRepo.save(subject);
        return ResponseEntity.ok(subject);
    }

}
