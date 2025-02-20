package com.notesapp.repository;

import com.notesapp.entity.Topic;
import com.notesapp.entity.Unit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TopicRepo extends JpaRepository<Topic, Integer> {
    List<Topic> findByUnit(Unit unit);
    Topic findById(int id);
}
