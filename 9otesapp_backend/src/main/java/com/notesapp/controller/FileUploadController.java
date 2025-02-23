package com.notesapp.controller;

import com.notesapp.entity.FileUrls;
import com.notesapp.entity.Topic;
import com.notesapp.repository.FileUrlsRepo;
import com.notesapp.repository.TopicRepo;
import com.notesapp.service.FileUrlsService;
import com.notesapp.service.GoogleDriveService;
import com.notesapp.service.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping({"/api/drive/"})
public class FileUploadController {
    @Autowired
    private TopicService topicService;
    @Autowired
    private FileUrlsService fileUrlsService;
    @Autowired
    private GoogleDriveService googleDriveService;
    @Autowired
    private TopicRepo topicRepo;
    @Autowired
    private FileUrlsRepo fileUrlsRepo;

    @PostMapping({"/upload"})
    public ResponseEntity<Map<String, String>> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam("topicId") int topicId,
            @RequestParam("folderName") String folderName,
            @RequestParam("comment") String comment) {

        Map<String, String> response = new HashMap<>();

        try {
            LocalDateTime dateTime = LocalDateTime.now();
            DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm:ss");
            String date = dateTime.format(dateFormatter);
            String time = dateTime.format(timeFormatter);

            String fileName = file.getOriginalFilename();

            String fileLink = googleDriveService.uploadFile(file, folderName,"File/" +date+"/"+time+"/"+fileName);

            FileUrls fileUrls = new FileUrls();

            fileUrls.setCreatedOn(date);
            fileUrls.setCreatedAt(time);
            fileUrls.setFileName(fileName);
            fileUrls.setUrl(fileLink);
            fileUrls.setComment(comment);
            fileUrlsService.addFileUrls(topicId, fileUrls);

            response.put("link", fileLink);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("error", "File upload failed: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }

    @GetMapping({"/getUrls/{topicId}"})
    public List<FileUrls> getFileUrls(@PathVariable("topicId") int topicId) {
        Topic topic = topicService.getTopicById(topicId);
        return fileUrlsService.getFileUrlsByTopic(topic);
    }

    @DeleteMapping("/deletefileurl")
    public ResponseEntity<?> deleteFileUrl(@RequestParam("fileId") int fileUrlId,
                                           @RequestParam("folderName") String folderName) {
        FileUrls fileUrls = fileUrlsService.getFileUrlsById(fileUrlId);
        fileUrlsService.deleteFileUrl(fileUrlId);

        String date = fileUrls.getCreatedOn();
        String time = fileUrls.getCreatedAt();
        String fileName = "File/" +date+"/"+time+"/"+fileUrls.getFileName();

        try {
            String res = googleDriveService.deleteFile(folderName,fileName);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return ResponseEntity.ok(fileUrls);
    }

    @GetMapping("/updatePreview/{fileId}")
    public ResponseEntity<Map<String, String>> updatePreviewState(@PathVariable("fileId") int fileUrlId) {
        FileUrls fileUrls = fileUrlsService.getFileUrlsById(fileUrlId);
        Topic topic = fileUrls.getTopic();

        Integer previousFileId = topic.getPreviewStateId();
        if (previousFileId == null) {
            previousFileId = -1;
        }

        FileUrls previousFileUrls = (previousFileId != -1) ? fileUrlsService.getFileUrlsById(previousFileId) : null;

        if (previousFileId != -1 && previousFileUrls != null) {
            previousFileUrls.setPreviewer(false);
        }

        fileUrls.setPreviewer(true);
        topic.setPreviewStateId(fileUrlId);

        topicRepo.save(topic);
        fileUrlsRepo.save(fileUrls);
        if (previousFileUrls != null) {
            fileUrlsRepo.save(previousFileUrls);
        }

        // Return JSON response instead of plain text
        Map<String, String> response = new HashMap<>();
        response.put("message", "Successfully updated preview state");

        return ResponseEntity.ok(response);
    }

}
