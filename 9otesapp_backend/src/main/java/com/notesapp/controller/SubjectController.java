package com.notesapp.controller;

import com.notesapp.entity.*;
import com.notesapp.repository.*;
import com.notesapp.service.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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
    @Autowired
    private UnitRepo unitRepo;
    @Autowired
    private TopicRepo topicRepo;
    @Autowired
    private FileUrlsRepo fileUrlsRepo;

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

    @GetMapping({"/getsubject/{subid}"})
    public ResponseEntity<Subject> getSubject(@PathVariable("subid") int subid) {
        Subject subject = subjectRepo.findById(subid);
        return ResponseEntity.ok(subject);
    }

    @PostMapping("/addImportedSubject")
    public ResponseEntity<Subject> addImportedSubject(@PathVariable("userId") int userId,@RequestBody Subject subject) {
        Subject newSubject = new Subject();
        newSubject.setUser(userRepo.findById(userId));
        newSubject.setSubname(subject.getSubname());
        subjectRepo.save(newSubject);

        List<Unit> units = new ArrayList<>();
        units.addAll(subject.getUnits());
        for (Unit unit : units) {
            Unit newUnit = new Unit();
            newUnit.setSubject(newSubject);
            newUnit.setUnitname(unit.getUnitname());
            unitRepo.save(newUnit);

            List<Topic> topics = new ArrayList<>();
            topics.addAll(unit.getTopics());
            for (Topic topic : topics) {
                Topic newTopic = new Topic();
                newTopic.setUnit(newUnit);
                newTopic.setTopicName(topic.getTopicName());
                newTopic.setTopicDescription(topic.getTopicDescription());
                newTopic.setPreviewStateId(topic.getPreviewStateId());
                topicRepo.save(newTopic);

                List<FileUrls> fileUrls = new ArrayList<>();
                fileUrls.addAll(topic.getFileUrls());
                for (FileUrls fileUrl : fileUrls) {
                    FileUrls newFileUrl = new FileUrls();
                    newFileUrl.setTopic(newTopic);
                    newFileUrl.setUrl(fileUrl.getUrl());
                    newFileUrl.setFileName(fileUrl.getFileName());
                    newFileUrl.setCreatedOn(fileUrl.getCreatedOn());
                    newFileUrl.setPreviewer(fileUrl.isPreviewer());
                    newFileUrl.setComment(fileUrl.getComment());
                    newFileUrl.setCreatedAt(fileUrl.getCreatedAt());
                    fileUrlsRepo.save(newFileUrl);
                }
            }

        }
        return ResponseEntity.ok(newSubject);
    }

}
