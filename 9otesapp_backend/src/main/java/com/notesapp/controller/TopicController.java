package com.notesapp.controller;

import com.notesapp.entity.Topic;
import com.notesapp.entity.Unit;
import com.notesapp.repository.TopicRepo;
import com.notesapp.repository.UnitRepo;
import com.notesapp.service.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping({"/api/{unitId}"})
public class TopicController {
    @Autowired
    private TopicService topicService;

    @Autowired
    private TopicRepo topicRepo;

    @Autowired
    private UnitRepo unitRepo;

    @GetMapping({"/getalltopics"})
    public List<Topic> gettopics(@PathVariable("unitId") int unitId) {
        Unit unit = unitRepo.findById(unitId);
        return topicService.getTopicsByUnit(unit);
    }

    @PostMapping({"/addtopic"})
    public ResponseEntity<Topic> addTopic(@PathVariable("unitId") int unitId, @RequestBody Topic topic) {
        return ResponseEntity.ok(topicService.addTopic(unitId, topic));
    }

    @DeleteMapping("/deletetopic/{topicid}")
    public ResponseEntity<?> deleteTopic(@PathVariable("topicid") int topicid) {
        Topic topic = topicRepo.findById(topicid);
        topicRepo.deleteById(topicid);
        return ResponseEntity.ok(topic);  // Return the deleted unit
    }

    @PutMapping({"/updatetopic/{topicid}"})
    public ResponseEntity<?> updateTopic(@PathVariable("topicid") int topicid, @RequestParam("topicname") String updatedtopicname ) {
        Topic topic = topicRepo.findById(topicid);
        topic.setTopicName(updatedtopicname);
        topicRepo.save(topic);
        return ResponseEntity.ok(topic);
    }

    @GetMapping({"/gettopic/{topicid}"})
    public ResponseEntity<Topic> getTopic(@PathVariable("topicid") int topicid) {
        Topic topic = topicRepo.findById(topicid);
        return ResponseEntity.ok(topic);
    }

}
