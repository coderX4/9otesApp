package com.notesapp.service;

import com.google.api.services.drive.Drive;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.GeneralSecurityException;

public interface GoogleDriveService {

    Drive getDriveService() throws IOException, GeneralSecurityException;

    String getOrCreateFolder(String folderName) throws IOException, GeneralSecurityException;

    String uploadFile(MultipartFile file, String folderName, String fileName);

    String deleteFile(String folderName, String fileName);
}
