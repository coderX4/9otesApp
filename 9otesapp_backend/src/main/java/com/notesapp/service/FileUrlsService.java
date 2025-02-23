package com.notesapp.service;

import com.notesapp.entity.FileUrls;
import com.notesapp.entity.Topic;

import java.util.List;

public interface FileUrlsService {
    FileUrls addFileUrls(int topicId, FileUrls fileUrls);
    List<FileUrls> getFileUrlsByTopic(Topic topic);
    FileUrls getFileUrlsById(int id);
    void deleteFileUrl(int id);
}
