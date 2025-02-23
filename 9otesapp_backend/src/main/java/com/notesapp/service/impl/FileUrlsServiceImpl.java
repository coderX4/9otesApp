package com.notesapp.service.impl;

import com.notesapp.entity.FileUrls;
import com.notesapp.entity.Topic;
import com.notesapp.repository.FileUrlsRepo;
import com.notesapp.repository.TopicRepo;
import com.notesapp.service.FileUrlsService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FileUrlsServiceImpl implements FileUrlsService {

    private final FileUrlsRepo fileUrlsRepo;
    private final TopicRepo topicRepo;

    public FileUrlsServiceImpl(FileUrlsRepo fileUrlsRepo, TopicRepo topicRepo) {
        this.fileUrlsRepo = fileUrlsRepo;
        this.topicRepo = topicRepo;
    }

    @Override
    public FileUrls addFileUrls(int topicId, FileUrls fileUrls) {
        Topic topic = topicRepo.findById(topicId);
        fileUrls.setTopic(topic);
        return fileUrlsRepo.save(fileUrls);
    }

    @Override
    public List<FileUrls> getFileUrlsByTopic(Topic topic) {
        return fileUrlsRepo.findByTopic(topic);
    }

    @Override
    public FileUrls getFileUrlsById(int id) {
        return fileUrlsRepo.findById(id);
    }

    @Override
    public void deleteFileUrl(int id) {
        fileUrlsRepo.deleteById(id);
    }
}
