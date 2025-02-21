package com.notesapp.repository;

import com.notesapp.entity.FileUrls;
import com.notesapp.entity.Topic;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FileUrlsRepo extends JpaRepository<FileUrls, Integer> {
    List<FileUrls> findByTopic(Topic topic);
    FileUrls findById(int id);
}
