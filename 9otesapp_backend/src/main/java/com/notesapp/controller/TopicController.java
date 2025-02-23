package com.notesapp.controller;

import com.notesapp.entity.*;
import com.notesapp.repository.FileUrlsRepo;
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

    @Autowired
    private FileUrlsRepo fileUrlsRepo;

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
    public ResponseEntity<?> updateTopic(@PathVariable("topicid") int topicid, @RequestBody Topic topic) {

        Topic topicUpdated = topicRepo.findById(topicid);
        topicUpdated.setTopicName(topic.getTopicName());
        topicUpdated.setTopicDescription(topic.getTopicDescription());
        topicRepo.save(topic);
        return ResponseEntity.ok(topicUpdated);
    }

    @GetMapping({"/gettopicdata/{topicid}"})
    public ResponseEntity<TopicData> getTopic(@PathVariable("unitId") int unitId,
                                          @PathVariable("topicid") int topicId) {

        Unit unit = unitRepo.findById(unitId);
        Topic topic = topicRepo.findById(topicId);
        Subject subject = unit.getSubject();

        TopicData topicData = new TopicData();
        topicData.setId(topicId);
        topicData.setSubjectName(subject.getSubname());
        topicData.setUnitName(unit.getUnitname());
        topicData.setTopicName(topic.getTopicName());
        topicData.setTopicDescription(topic.getTopicDescription());

        return ResponseEntity.ok(topicData);
    }

    @GetMapping({"/showpreview/{topicId}"})
    public ResponseEntity<String> showPreview(@PathVariable("topicId") int topicId) {
        Topic topic = topicRepo.findById(topicId);
        int fileId = topic.getPreviewStateId();

        FileUrls file = fileUrlsRepo.findById(fileId);
        String fileUrl = file.getUrl();
        return ResponseEntity.ok(fileUrl);
    }
}
