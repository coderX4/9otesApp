package com.notesapp.service;

import com.notesapp.entity.Topic;
import com.notesapp.entity.Unit;

import java.util.List;

public interface TopicService {
    Topic addTopic(int unitId, Topic topic);
    List<Topic> getTopicsByUnit(Unit unit);
    Topic getTopicById(int id);
    void deleteTopic(int id);
}
