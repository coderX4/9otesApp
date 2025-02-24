package com.notesapp.requests;

import com.notesapp.entity.FileUrls;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
public class TopicData {
    private int id;
    private String subjectName;
    private String unitName;
    private String topicName;
    private String topicDescription;
    private List<FileUrls> fileUrls;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public String getUnitName() {
        return unitName;
    }

    public void setUnitName(String unitName) {
        this.unitName = unitName;
    }

    public String getTopicName() {
        return topicName;
    }

    public void setTopicName(String topicName) {
        this.topicName = topicName;
    }

    public String getTopicDescription() {
        return topicDescription;
    }

    public void setTopicDescription(String topicDescription) {
        this.topicDescription = topicDescription;
    }

    public List<FileUrls> getFileUrls() {
        return fileUrls;
    }

    public void setFileUrls(List<FileUrls> fileUrls) {
        this.fileUrls = fileUrls;
    }

}
