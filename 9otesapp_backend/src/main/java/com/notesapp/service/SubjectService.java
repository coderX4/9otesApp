package com.notesapp.service;

import com.notesapp.entity.Subject;
import com.notesapp.entity.User;

import java.util.List;

public interface SubjectService {

    Subject addSubject(int userId, Subject subject);

    List<Subject> getSubjectsByUser(User user);

    Subject getSubjectById(int subid);

    void deleteSub(int id);

}
