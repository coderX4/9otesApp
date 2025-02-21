package com.notesapp.controller;

import com.notesapp.entity.FileUrls;
import com.notesapp.entity.Topic;
import com.notesapp.service.FileUrlsService;
import com.notesapp.service.GoogleDriveService;
import com.notesapp.service.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
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

    @PostMapping({"/upload"})
    public ResponseEntity<Map<String, String>> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam("topicId") int topicId,
            @RequestParam("folderName") String folderName) {

        Map<String, String> response = new HashMap<>();

        try {
            String fileLink = googleDriveService.uploadFile(file, folderName);

            FileUrls fileUrls = new FileUrls();
            fileUrls.setUrl(fileLink);
            fileUrlsService.addFileUrls(topicId, fileUrls);

            response.put("link", fileLink);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("error", "File upload failed: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }

}
