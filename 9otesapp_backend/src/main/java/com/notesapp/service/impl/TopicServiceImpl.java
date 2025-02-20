package com.notesapp.service.impl;

import com.notesapp.entity.Topic;
import com.notesapp.entity.Unit;
import com.notesapp.repository.TopicRepo;
import com.notesapp.repository.UnitRepo;
import com.notesapp.service.TopicService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TopicServiceImpl implements TopicService {

    private final TopicRepo topicRepo;
    private final UnitRepo unitRepo;

    public TopicServiceImpl(TopicRepo topicRepo, UnitRepo unitRepo) {
        this.topicRepo = topicRepo;
        this.unitRepo = unitRepo;
    }

    @Override
    public Topic addTopic(int unitId, Topic topic) {
        Unit unit = unitRepo.findById(unitId);
        topic.setUnit(unit);
        return topicRepo.save(topic);
    }

    @Override
    public List<Topic> getTopicsByUnit(Unit unit) {
        return topicRepo.findByUnit(unit);
    }

    @Override
    public Topic getTopicById(int id) {
        return topicRepo.findById(id);
    }

    @Override
    public void deleteTopic(int id) {
        topicRepo.deleteById(id);
    }
}
