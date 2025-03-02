package com.notesapp.service.impl;

import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.InputStreamContent;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.model.File;
import com.google.api.services.drive.model.FileList;
import com.google.api.services.drive.model.Permission;
import com.google.auth.http.HttpCredentialsAdapter;
import com.google.auth.oauth2.GoogleCredentials;
import com.notesapp.service.GoogleDriveService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.List;

@Service
public class GoogleDriveServiceImpl implements GoogleDriveService {

    private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
    private static final List<String> SCOPES = List.of("https://www.googleapis.com/auth/drive.file");

    @Value("${google.drive.parentFolderId}")
    private String PARENT_FOLDER_ID;

    @Override
    public Drive getDriveService() throws IOException, GeneralSecurityException {
        InputStream credentialsStream = new ClassPathResource("cred.json").getInputStream();
        GoogleCredentials credentials = GoogleCredentials.fromStream(credentialsStream).createScoped(SCOPES);
        return new Drive.Builder(GoogleNetHttpTransport.newTrustedTransport(), JSON_FACTORY, new HttpCredentialsAdapter(credentials))
                .setApplicationName("9otesapp")
                .build();
    }

    /**
     *  Checks if a folder exists inside the predefined parent folder.
     *  If it does not exist, creates a new folder inside the static parent folder.
     */
    @Override
    public String getOrCreateFolder(String folderName) throws IOException, GeneralSecurityException {
        Drive driveService = getDriveService();

        //  Step 1: Search for folder inside the PARENT_FOLDER_ID
        String query = "mimeType='application/vnd.google-apps.folder' and name='" + folderName + "' and '" + PARENT_FOLDER_ID + "' in parents and trashed=false";
        FileList result = driveService.files().list()
                .setQ(query)
                .setFields("files(id, name)")
                .execute();

        if (!result.getFiles().isEmpty()) {
            String existingFolderId = result.getFiles().get(0).getId();
            System.out.println(" Folder already exists: " + folderName + " (ID: " + existingFolderId + ")");
            return existingFolderId;
        }

        // Step 2: Create a new folder inside PARENT_FOLDER_ID
        File folderMetadata = new File();
        folderMetadata.setName(folderName);
        folderMetadata.setMimeType("application/vnd.google-apps.folder");
        folderMetadata.setParents(Collections.singletonList(PARENT_FOLDER_ID));  // Create inside predefined folder

        File createdFolder = driveService.files()
                .create(folderMetadata)
                .setFields("id")
                .execute();

        String newFolderId = createdFolder.getId();
        System.out.println(" New folder created: " + folderName + " (ID: " + newFolderId + ")");
        return newFolderId;
    }

    /**
     *  Uploads a file inside a dynamically created Google Drive subfolder within the static parent folder.
     */
    @Override
    public String uploadFile(MultipartFile file, String folderName, String fileName) {
        try {
            Drive driveService = getDriveService();

            //  Step 1: Get folder ID inside PARENT_FOLDER_ID
            String folderId = getOrCreateFolder(folderName);

            //  Step 2: Prepare file metadata
            File fileMetadata = new File();
            fileMetadata.setName(fileName);
            fileMetadata.setParents(Collections.singletonList(folderId));  // Upload into the correct folder

            InputStreamContent fileContent = new InputStreamContent(
                    file.getContentType() != null ? file.getContentType() : "application/octet-stream",
                    file.getInputStream()
            );

            //  Step 3: Upload file
            File uploadedFile = driveService.files()
                    .create(fileMetadata, fileContent)
                    .setFields("id, webViewLink")
                    .execute();

            //  Step 4: Make file publicly accessible
            driveService.permissions().create(uploadedFile.getId(),
                            new Permission()
                                    .setType("anyone")
                                    .setRole("reader"))
                    .execute();

            System.out.println("File Uploaded Successfully: " + uploadedFile.getWebViewLink());

            return uploadedFile.getWebViewLink();
        } catch (Exception e) {
            e.printStackTrace();
            return "File upload failed. Error: " + e.getMessage();
        }
    }

    @Override
    public String deleteFile(String folderName, String fileName) {
        try {
            Drive driveService = getDriveService();

            // Step 1: Get folder ID inside PARENT_FOLDER_ID
            String folderQuery = "mimeType='application/vnd.google-apps.folder' and name='" + folderName + "' and '" + PARENT_FOLDER_ID + "' in parents and trashed=false";
            FileList folderResult = driveService.files().list()
                    .setQ(folderQuery)
                    .setFields("files(id, name)")
                    .execute();

            if (folderResult.getFiles().isEmpty()) {
                System.out.println("Folder not found: " + folderName);
                return "Folder not found";
            }

            String folderId = folderResult.getFiles().get(0).getId();

            // Step 2: Search for the file in the specified folder
            String fileQuery = "name='" + fileName + "' and '" + folderId + "' in parents and trashed=false";
            FileList fileResult = driveService.files().list()
                    .setQ(fileQuery)
                    .setFields("files(id, name)")
                    .execute();

            if (fileResult.getFiles().isEmpty()) {
                System.out.println("File not found: " + fileName);
                return "File not found";
            }

            // Step 3: Delete the file
            String fileId = fileResult.getFiles().get(0).getId();
            driveService.files().delete(fileId).execute();

            System.out.println("File deleted successfully: " + fileName);
            return "File deleted successfully";
        } catch (Exception e) {
            e.printStackTrace();
            return "File deletion failed. Error: " + e.getMessage();
        }
    }

}
